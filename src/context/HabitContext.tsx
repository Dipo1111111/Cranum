import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CranumHabit, CranumGoal, CranumPhase } from '../types/habit';
import { generateDailyPrescription, DailyPlan, StackPrescription } from '../lib/scheduler';
import { CRANUM_HABITS, CRANUM_STACKS } from '../data/cranumData';

interface HabitContextType {
    selectedGoals: CranumGoal[];
    completions: string[];
    history: Record<string, string[]>;
    loading: boolean;
    allHabits: CranumHabit[];
    activeHabits: CranumHabit[];
    reminderHabits: CranumHabit[];
    lifestyleArticles: CranumHabit[];
    schedule: Record<string, DailyPlan>;
    todayPlan: DailyPlan;
    warnings: string[];
    currentPhase: CranumPhase;
    phaseProgress: { currentStreak: number, requiredDays: number };
    primaryGoal: CranumGoal | null;
    stats: {
        activeTasks: number;
        activeMinutes: number;
    };
    setGoalsHierarchy: (goals: CranumGoal[]) => Promise<void>;
    setSelectedGoals: (goals: CranumGoal[]) => void;
    completionRate: number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [selectedGoals, setSelectedGoalsState] = useState<CranumGoal[]>([]);
    const [completions, setCompletions] = useState<string[]>([]);
    const [history, setHistory] = useState<Record<string, string[]>>({});
    const [currentPhase, setCurrentPhase] = useState<CranumPhase>(1);
    const [phaseProgress, setPhaseProgress] = useState({ currentStreak: 0, requiredDays: 14 });
    const [loading, setLoading] = useState(true);

    const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
    const primaryGoal = selectedGoals.length > 0 ? selectedGoals[0] : null;

    // Filter habits based on selected goals
    const allHabits = useMemo(() => {
        return CRANUM_HABITS.filter(h =>
            h.goals.some(g => selectedGoals.includes(g as any))
        );
    }, [selectedGoals]);

    const activeHabits = useMemo(() => allHabits.filter(h => h.category === 'active'), [allHabits]);
    const reminderHabits = useMemo(() => allHabits.filter(h => h.category === 'continuous'), [allHabits]);
    const lifestyleArticles = useMemo(() => allHabits.filter(h => h.category === 'lifestyle'), [allHabits]);

    // Generate prescription for today
    const { todayPlan, warnings } = useMemo(() => {
        const plan = generateDailyPrescription(CRANUM_HABITS, history, selectedGoals, currentPhase, CRANUM_STACKS);
        return {
            todayPlan: plan,
            warnings: plan.warnings
        };
    }, [history, selectedGoals, currentPhase]);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch longer history for phase progression (last 30 days)
            const thirtyDaysAgo = format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
            // Goals are assumed returned in the order they were inserted, or we can just rely on the array order.
            // Supabase returns them by default order, we should ensure the order is kept. We can order by selected_at.
            const [goalsRes, completionsRes, historyRes] = await Promise.all([
                supabase.from('user_goals').select('goal_id').eq('user_id', user.id).order('selected_at', { ascending: true }),
                supabase.from('habit_completions').select('habit_id').eq('user_id', user.id).eq('completed_at', todayStr),
                supabase.from('habit_completions').select('habit_id, completed_at').eq('user_id', user.id).gte('completed_at', thirtyDaysAgo)
            ]);

            if (goalsRes.data) setSelectedGoalsState(goalsRes.data.map(g => g.goal_id as CranumGoal));
            if (completionsRes.data) setCompletions(completionsRes.data.map(c => c.habit_id));

            if (historyRes.data) {
                const hist: Record<string, string[]> = {};
                historyRes.data.forEach(c => {
                    if (!hist[c.completed_at]) hist[c.completed_at] = [];
                    hist[c.completed_at].push(c.habit_id);
                });
                setHistory(hist);

                // --- PHASE PROGRESSION LOGIC ---
                // We track "good days" (days with >3 completions, or simplified >80% logic).
                // For a robust implementation, we just count how many unique days in the last 14 days had at least 3 habits done.
                // If they have 10+ compliant days in the last 14, they unlock Phase 2.
                // If they have 20+ compliant days in the last 30, they unlock Phase 3.

                const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
                let compliantDays14 = 0;
                let compliantDays30 = 0;

                Object.entries(hist).forEach(([dateStr, habits]) => {
                    // We consider 3+ habits a "compliant" foundational day
                    if (habits.length >= 3) {
                        compliantDays30++;
                        if (new Date(dateStr) >= fourteenDaysAgo) {
                            compliantDays14++;
                        }
                    }
                });

                let newPhase: CranumPhase = 1;
                let required = 10; // Days needed for Phase 2
                let current = compliantDays14;

                if (compliantDays30 >= 20) {
                    newPhase = 3;
                    required = 20;
                    current = compliantDays30;
                } else if (compliantDays14 >= 10) {
                    newPhase = 2;
                    required = 20; // Next goal is Phase 3
                    current = compliantDays30;
                }

                setCurrentPhase(newPhase);
                setPhaseProgress({ currentStreak: current, requiredDays: required });
            }
        } catch (error) {
            console.error('Error fetching habit data:', error);
        } finally {
            // Minimum delay for branding if it's too fast
            setTimeout(() => setLoading(false), 800);
        }
    }, [user, todayStr]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleHabit = async (habitId: string) => {
        if (!user) return;
        const isCompleted = completions.includes(habitId);

        if (isCompleted) {
            setCompletions(prev => prev.filter(id => id !== habitId));
            await supabase.from('habit_completions').delete()
                .eq('user_id', user.id).eq('habit_id', habitId).eq('completed_at', todayStr);
        } else {
            setCompletions(prev => [...prev, habitId]);
            await supabase.from('habit_completions').insert([{
                user_id: user.id, habit_id: habitId, completed_at: todayStr
            }]);
        }
    };

    const setGoalsHierarchy = async (goals: CranumGoal[]) => {
        if (!user || goals.length > 3) return;

        setSelectedGoalsState(goals);

        await supabase.from('user_goals').delete().eq('user_id', user.id);

        if (goals.length > 0) {
            // Insert one by one to ensure ascending selected_at, 
            // or just use a small delay if needed. But array insert works.
            const inserts = goals.map((g, i) => ({
                user_id: user.id,
                goal_id: g,
                // Add tiny offset to ensure sort order
                selected_at: new Date(Date.now() + i * 1000).toISOString()
            }));
            await supabase.from('user_goals').insert(inserts);
        }
    };

    const completionRate = useMemo(() => {
        const totalScheduled = todayPlan.morning.length + todayPlan.night.length;
        if (totalScheduled === 0) return 100;
        const validCompletions = completions.filter(id =>
            [...todayPlan.morning, ...todayPlan.night].some(h => h.id === id)
        );
        return (validCompletions.length / totalScheduled) * 100;
    }, [completions, todayPlan]);

    const stats = useMemo(() => ({
        activeTasks: todayPlan.morning.length + todayPlan.night.length,
        activeMinutes: todayPlan.totalMinutes
    }), [todayPlan]);

    const value = {
        selectedGoals,
        completions,
        history,
        loading,
        allHabits,
        activeHabits,
        reminderHabits,
        lifestyleArticles,
        schedule: {}, // deprecated weekly schedule
        todayPlan,
        warnings,
        currentPhase,
        phaseProgress,
        primaryGoal,
        stats,
        toggleHabit,
        setGoalsHierarchy,
        setSelectedGoals: setSelectedGoalsState,
        completionRate
    };

    return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabitContext() {
    const context = useContext(HabitContext);
    if (context === undefined) {
        throw new Error('useHabitContext must be used within a HabitProvider');
    }
    return context;
}
