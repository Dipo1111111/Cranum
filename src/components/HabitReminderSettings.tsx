import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Clock, Calendar, AlertTriangle, FileText, Check } from 'lucide-react';
import { Habit } from '@/types/habit';
import { NotificationsState } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface HabitReminderSettingsProps {
  habits: Habit[];
  notifications: NotificationsState;
}

export function HabitReminderSettings({ habits, notifications }: HabitReminderSettingsProps) {
  const {
    permission,
    reminders,
    requestPermission,
    setReminder,
    getReminder,
    globalSettings,
    updateGlobalSettings
  } = notifications;

  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editTime, setEditTime] = useState('09:00');

  // Helper to toggle global settings
  const toggleGlobal = (key: keyof typeof globalSettings.enabledAlerts) => {
    updateGlobalSettings({
      enabledAlerts: {
        ...globalSettings.enabledAlerts,
        [key]: !globalSettings.enabledAlerts[key]
      }
    });
  };

  const handleEnableNotifications = async () => {
    const granted = await requestPermission();
    if (granted) toast.success('Notifications enabled!');
    else toast.error('Please enable notifications in your browser settings');
  };

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

  if (permission !== 'granted') {
    return (
      <div className="card-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {permission === 'denied' ? <BellOff size={24} className="text-destructive" /> : <Bell size={24} className="text-primary" />}
            <div>
              <p className="font-medium text-foreground">Enable Notifications</p>
              <p className="text-sm text-muted-foreground">Required for all alerts</p>
            </div>
          </div>
          <button onClick={handleEnableNotifications} className="btn-primary text-sm">
            Enable
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Global Alerts Section */}
      <div className="card-elevated space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell size={18} className="text-primary" />
          System Alerts
        </h3>

        <div className="space-y-3">
          {/* Missed Habit Alert */}
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-amber-500" />
              <div>
                <p className="font-medium text-sm">Missed Habit Alert</p>
                <p className="text-xs text-muted-foreground">Daily notification for incomplete habits</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={globalSettings.missedAlertTime}
                onChange={(e) => updateGlobalSettings({ missedAlertTime: e.target.value })}
                className="bg-transparent border-b border-border w-[60px] text-xs focus:outline-none"
              />
              <button
                onClick={() => toggleGlobal('missedHabits')}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.missedHabits ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* Daily Summary */}
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-blue-500" />
              <div>
                <p className="font-medium text-sm">Daily Summary</p>
                <p className="text-xs text-muted-foreground">End-of-day report on your progress</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={globalSettings.dailySummaryTime}
                onChange={(e) => updateGlobalSettings({ dailySummaryTime: e.target.value })}
                className="bg-transparent border-b border-border w-[60px] text-xs focus:outline-none"
              />
              <button
                onClick={() => toggleGlobal('dailySummary')}
                className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.dailySummary ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>

          {/* Plan Reminders Toggle */}
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-green-500" />
              <div>
                <p className="font-medium text-sm">Plan Task Reminders</p>
                <p className="text-xs text-muted-foreground">Notify at assigned task times</p>
              </div>
            </div>
            <button
              onClick={() => toggleGlobal('planReminders')}
              className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.planReminders ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Habit Reminders Section */}
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
