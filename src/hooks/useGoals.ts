import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { CranumGoal } from '../types/habit';

export function useGoals() {
    const { user } = useAuth();
    const [selectedGoals, setSelectedGoals] = useState<CranumGoal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchGoals();
        }
    }, [user]);

    const fetchGoals = async () => {
        try {
            const { data, error } = await supabase
                .from('user_goals')
                .select('goal_id')
                .eq('user_id', user?.id);

            if (error) throw error;
            setSelectedGoals((data || []).map(g => g.goal_id as CranumGoal));
        } catch (error) {
            console.error('Error fetching goals:', error);
            // Fallback to local storage if needed or just empty
        } finally {
            setLoading(false);
        }
    };

    const toggleGoal = async (goalId: CranumGoal) => {
        if (!user) return;

        const isSelected = selectedGoals.includes(goalId);
        let newGoals: CranumGoal[];

        if (isSelected) {
            newGoals = selectedGoals.filter(id => id !== goalId);
            await supabase
                .from('user_goals')
                .delete()
                .eq('user_id', user.id)
                .eq('goal_id', goalId);
        } else {
            newGoals = [...selectedGoals, goalId];
            await supabase
                .from('user_goals')
                .insert([{ user_id: user.id, goal_id: goalId }]);
        }

        setSelectedGoals(newGoals);
    };

    return {
        selectedGoals,
        setSelectedGoals, // Add this
        loading,
        toggleGoal,
        isFirstTime: selectedGoals.length === 0 && !loading
    };
}
