import { useState, useEffect, useCallback } from 'react';
import { CranumHabit } from '@/types/habit';
import { format } from 'date-fns';

const NOTIFICATIONS_KEY = 'cranum_reminders';
const GLOBAL_SETTINGS_KEY = 'cranum_settings';

export interface HabitReminder {
  habitId: string;
  enabled: boolean;
  time: string; // HH:MM format
}

export interface GlobalNotificationSettings {
  enabledAlerts: {
    habitReminders: boolean;
    dailySummary: boolean;
  };
}

const DEFAULT_GLOBAL_SETTINGS: GlobalNotificationSettings = {
  enabledAlerts: {
    habitReminders: true,
    dailySummary: true,
  }
};

interface UseNotificationsProps {
  habits_today: CranumHabit[];
  isHabitCompleted: (habitId: string) => boolean;
}

export function useNotifications({
  habits_today = [],
  isHabitCompleted,
}: UseNotificationsProps) {
  const [reminders, setReminders] = useState<Record<string, HabitReminder>>({});
  const [globalSettings, setGlobalSettings] = useState<GlobalNotificationSettings>(DEFAULT_GLOBAL_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedReminders = localStorage.getItem(NOTIFICATIONS_KEY);
    const savedGlobal = localStorage.getItem(GLOBAL_SETTINGS_KEY);

    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedGlobal) setGlobalSettings(JSON.parse(savedGlobal));

    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(reminders));
      localStorage.setItem(GLOBAL_SETTINGS_KEY, JSON.stringify(globalSettings));
    }
  }, [reminders, globalSettings, isLoaded]);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  }, []);

  const setReminder = useCallback((habitId: string, time: string, enabled: boolean) => {
    setReminders(prev => ({ ...prev, [habitId]: { habitId, time, enabled } }));
  }, []);

  const checkAndNotify = useCallback(() => {
    if (permission !== 'granted') return;

    const now = new Date();
    const currentTime = format(now, 'HH:mm');

    const notify = (tag: string, title: string, body: string) => {
      new Notification(title, { body, icon: '/pwa-192x192.png', tag });
    };

    // Habit Reminders
    if (globalSettings.enabledAlerts.habitReminders) {
      habits_today.forEach(habit => {
        const reminder = reminders[habit.id];
        if (reminder?.enabled && reminder.time === currentTime && !isHabitCompleted(habit.id)) {
          notify(`habit-${habit.id}`, `Cranum: ${habit.name}`, `Time to execute. Maintain your discipline.`);
        }
      });
    }
  }, [permission, reminders, globalSettings, habits_today, isHabitCompleted]);

  useEffect(() => {
    if (!isLoaded || permission !== 'granted') return;
    const interval = setInterval(checkAndNotify, 1000 * 60);
    return () => clearInterval(interval);
  }, [isLoaded, permission, checkAndNotify]);

  return {
    permission,
    reminders,
    globalSettings,
    requestPermission,
    setReminder,
    updateGlobalSettings: (s: any) => setGlobalSettings(prev => ({ ...prev, ...s }))
  };
}