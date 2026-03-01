import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Habit } from '@/types/habit';

interface DayDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    dateStr: string | null;
    habits: Habit[];
    isHabitCompleted: (habitId: string, dateStr: string) => boolean;
    onToggleHabit: (habitId: string, dateStr: string) => void;
}

export function DayDetailModal({
    isOpen,
    onClose,
    dateStr,
    habits,
    isHabitCompleted,
    onToggleHabit
}: DayDetailModalProps) {
    if (!dateStr) return null;

    const date = parseISO(dateStr);
    const dayOfWeek = date.getDay();

    // Filter habits applicable for this day
    const dailyHabits = habits.filter(habit => {
        // If completed on this day, always show it (even if frequency changed)
        if (isHabitCompleted(habit.id, dateStr)) return true;

        if (!habit.frequency || habit.frequency.length === 0) return true;
        return habit.frequency.includes(dayOfWeek);
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border overflow-hidden"
                        >
                            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">
                                        {format(date, 'EEEE, MMMM d')}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        History Editor
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                                {dailyHabits.length > 0 ? (
                                    dailyHabits.map((habit) => {
                                        const isCompleted = isHabitCompleted(habit.id, dateStr);
                                        return (
                                            <div
                                                key={habit.id}
                                                onClick={() => onToggleHabit(habit.id, dateStr)}
                                                className={`
                          flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer
                          ${isCompleted
                                                        ? 'bg-primary/10 border-primary/20'
                                                        : 'bg-card border-border hover:border-primary/50'}
                        `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`
                              w-6 h-6 rounded-full flex items-center justify-center border transition-colors
                              ${isCompleted
                                                                ? 'bg-primary border-primary text-primary-foreground'
                                                                : 'border-muted-foreground/30 text-transparent'}
                            `}
                                                    >
                                                        <Check size={14} strokeWidth={3} />
                                                    </div>
                                                    <span className={`font-medium ${isCompleted ? 'text-primary' : 'text-foreground'}`}>
                                                        {habit.name}
                                                    </span>
                                                </div>
                                                <span className={`text-sm ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    +{habit.xp} XP
                                                </span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No habits were scheduled for this day.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
