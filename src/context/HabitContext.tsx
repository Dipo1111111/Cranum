import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CranumHabit, CranumGoal } from '../types/habit';
import { generateWeeklySchedule, DailyPlan } from '../lib/scheduler';
import { CRANUM_HABITS } from '../data/cranumData';

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
    stats: {
        activeTasks: number;
        activeMinutes: number;
    };
    toggleHabit: (habitId: string) => Promise<void>;
    toggleGoal: (goalId: CranumGoal) => Promise<void>;
    setSelectedGoals: (goals: CranumGoal[]) => void;
    completionRate: number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [selectedGoals, setSelectedGoalsState] = useState<CranumGoal[]>([]);
    const [completions, setCompletions] = useState<string[]>([]);
    const [history, setHistory] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(true);

    const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

    // Filter habits based on selected goals
    const allHabits = useMemo(() => {
        return CRANUM_HABITS.filter(h =>
            h.goals.some(g => selectedGoals.includes(g as any))
        );
    }, [selectedGoals]);

    const activeHabits = useMemo(() => allHabits.filter(h => h.category === 'active'), [allHabits]);
    const reminderHabits = useMemo(() => allHabits.filter(h => h.category === 'continuous'), [allHabits]);
    const lifestyleArticles = useMemo(() => allHabits.filter(h => h.category === 'lifestyle'), [allHabits]);

    // Generate schedule once
    const { schedule, warnings } = useMemo(() => {
        const weeklySchedule = generateWeeklySchedule(activeHabits, history);
        return {
            schedule: weeklySchedule.days,
            warnings: weeklySchedule.warnings
        };
    }, [activeHabits, history]);

    const todayPlan: DailyPlan = useMemo(() =>
        schedule[todayStr] || { morning: [], night: [], totalMinutes: 0, warnings: [] },
        [schedule, todayStr]);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [goalsRes, completionsRes, historyRes] = await Promise.all([
                supabase.from('user_goals').select('goal_id').eq('user_id', user.id),
                supabase.from('habit_completions').select('habit_id').eq('user_id', user.id).eq('completed_at', todayStr),
                supabase.from('habit_completions').select('habit_id, completed_at').eq('user_id', user.id).gte('completed_at', format(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'))
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

    const toggleGoal = async (goalId: CranumGoal) => {
        if (!user) return;
        const isSelected = selectedGoals.includes(goalId);
        if (isSelected) {
            setSelectedGoalsState(prev => prev.filter(id => id !== goalId));
            await supabase.from('user_goals').delete().eq('user_id', user.id).eq('goal_id', goalId);
        } else {
            setSelectedGoalsState(prev => [...prev, goalId]);
            await supabase.from('user_goals').insert([{ user_id: user.id, goal_id: goalId }]);
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
        schedule,
        todayPlan,
        warnings,
        stats,
        toggleHabit,
        toggleGoal,
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
