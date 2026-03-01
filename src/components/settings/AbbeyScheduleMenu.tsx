import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Bell, BellOff, Check } from 'lucide-react';
import { Habit } from '@/types/habit';
import { NotificationsState } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface AbbeyScheduleMenuProps {
    habits: Habit[];
    notifications: NotificationsState;
}

export function AbbeyScheduleMenu({ habits, notifications }: AbbeyScheduleMenuProps) {
    const {
        reminders,
        setReminder,
        getReminder
    } = notifications;

    const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
    const [editTime, setEditTime] = useState('09:00');

    const handleToggleReminder = (habit: Habit) => {
        const existing = getReminder(habit.id);
        if (existing?.enabled) {
            setReminder(habit.id, existing.time, false);
            toast.success(`Reminder disabled for ${habit.name}`);
        } else {
            setEditingHabitId(habit.id);
            setEditTime(existing?.time || '09:00');
        }
    };

    const handleSaveReminder = (habitId: string, habitName: string) => {
        setReminder(habitId, editTime, true);
        setEditingHabitId(null);
        toast.success(`Reminder set for ${habitName} at ${editTime}`);
    };

    return (
        <div className="space-y-4">
            <div className="card-elevated">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    Habit Schedules
                </h3>

                <div className="space-y-3">
                    {habits.map((habit) => {
                        const reminder = getReminder(habit.id);
                        const isEditing = editingHabitId === habit.id;

                        return (
                            <motion.div
                                key={habit.id}
                                layout
                                className="bg-secondary/50 rounded-lg p-3"
                            >
                                {isEditing ? (
                                    <div className="space-y-3">
                                        <p className="font-medium text-foreground">{habit.name}</p>
                                        <div className="flex items-center gap-3">
                                            <Clock size={18} className="text-muted-foreground" />
                                            <input
                                                type="time"
                                                value={editTime}
                                                onChange={(e) => setEditTime(e.target.value)}
                                                className="input-field flex-1"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSaveReminder(habit.id, habit.name)}
                                                className="flex-1 btn-primary py-2"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingHabitId(null)}
                                                className="btn-ghost py-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-foreground">{habit.name}</p>
                                            {reminder?.enabled && (
                                                <p className="text-xs text-primary flex items-center gap-1 mt-1">
                                                    <Check size={12} />
                                                    {reminder.time}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleToggleReminder(habit)}
                                            className={`p-2 rounded-lg transition-colors ${reminder?.enabled
                                                ? 'bg-primary/20 text-primary'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                }`}
                                        >
                                            {reminder?.enabled ? <Bell size={18} /> : <BellOff size={18} />}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
