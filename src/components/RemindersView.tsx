import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { HabitCard } from './HabitCard';

export function RemindersView() {
    const { reminderHabits } = useHabitContext();

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Daily Cues</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Postural and awareness habits to maintain throughout the day. No checkboxes—just cues.
                </p>
            </div>

            <div className="space-y-3">
                {reminderHabits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        isContinuous
                    />
                ))}
                {reminderHabits.length === 0 && (
                    <div className="text-center py-12 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
                        <Zap className="mx-auto text-muted-foreground/30 mb-2" size={32} />
                        <p className="text-xs text-muted-foreground italic">Select goals to see reminders.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
