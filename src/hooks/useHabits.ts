import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CranumHabit } from '../types/habit';
import { generateWeeklySchedule, DailyPlan } from '../lib/scheduler';
import { useGoals } from './useGoals';
import { format } from 'date-fns';
import { CRANUM_HABITS } from '../data/cranumData';

export function useHabits() {
  const { user } = useAuth();
  const { selectedGoals, setSelectedGoals } = useGoals();
  const [completions, setCompletions] = useState<string[]>([]);
  const [history, setHistory] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  const allHabits = useMemo(() => {
    return CRANUM_HABITS.filter(h =>
      h.goals.some(g => selectedGoals.includes(g as any))
    );
  }, [selectedGoals]);

  const activeHabits = useMemo(() => allHabits.filter(h => h.category === 'active'), [allHabits]);

  const { schedule, reminderHabits, warnings } = useMemo(() => {
    const weeklySchedule = generateWeeklySchedule(activeHabits, history);
    return {
      schedule: weeklySchedule.days,
      reminderHabits: weeklySchedule.continuousHabits,
      warnings: weeklySchedule.warnings
    };
  }, [activeHabits, history]);

  const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const todayPlan: DailyPlan = useMemo(() =>
    schedule[todayStr] || { morning: [], night: [], totalMinutes: 0, warnings: [] },
    [schedule, todayStr]);

  const lifestyleArticles = useMemo(() => allHabits.filter(h => h.category === 'lifestyle'), [allHabits]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeHabits]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchTodayCompletions(),
      fetchHistory()
    ]);
    setLoading(false);
  };

  const fetchTodayCompletions = async () => {
    try {
      const { data, error } = await supabase
        .from('habit_completions')
        .select('habit_id')
        .eq('user_id', user?.id)
        .eq('completed_at', todayStr);

      if (error) throw error;
      setCompletions((data || []).map(c => c.habit_id));
    } catch (error) {
      console.error('Error today completions:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
      const sixtyDaysAgoStr = format(sixtyDaysAgo, 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('habit_completions')
        .select('habit_id, completed_at')
        .eq('user_id', user?.id)
        .gte('completed_at', sixtyDaysAgoStr);

      if (error) throw error;

      const hist: Record<string, string[]> = {};
      (data || []).forEach(c => {
        if (!hist[c.completed_at]) hist[c.completed_at] = [];
        hist[c.completed_at].push(c.habit_id);
      });
      setHistory(hist);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const toggleHabit = async (habitId: string) => {
    if (!user) return;

    const isCompleted = completions.includes(habitId);

    if (isCompleted) {
      const { error } = await supabase
        .from('habit_completions')
        .delete()
        .eq('user_id', user.id)
        .eq('habit_id', habitId)
        .eq('completed_at', todayStr);

      if (!error) {
        setCompletions(prev => prev.filter(id => id !== habitId));
      }
    } else {
      const { error } = await supabase
        .from('habit_completions')
        .insert([{
          user_id: user.id,
          habit_id: habitId,
          completed_at: todayStr
        }]);

      if (!error) {
        setCompletions(prev => [...prev, habitId]);
      }
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

  return {
    schedule,
    todayPlan,
    activeHabits,
    reminderHabits,
    lifestyleArticles,
    continuousHabits: reminderHabits,
    completions,
    history,
    loading,
    toggleHabit,
    selectedGoals,
    setSelectedGoals,
    warnings,
    stats: {
      activeTasks: (todayPlan.morning.length + todayPlan.night.length),
      activeMinutes: todayPlan.totalMinutes
    },
    completionRate
  };
}
