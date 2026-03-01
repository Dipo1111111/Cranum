import { CranumHabit, CranumGoal } from '../types/habit';
import { format, addDays } from 'date-fns';

export interface DailyPlan {
    morning: CranumHabit[];
    night: CranumHabit[];
    totalMinutes: number;
    warnings: string[];
}

export interface WeeklySchedule {
    days: Record<string, DailyPlan>; // ISO Date String
    continuousHabits: CranumHabit[];
    warnings: string[];
}

/**
 * Smart Scheduling Engine for Cranum
 * Distributes habits across the week based on frequency and daily limits.
 */
export function generateWeeklySchedule(
    habits: CranumHabit[],
    history: Record<string, string[]>,
    dailyLimit: number = 8
): WeeklySchedule {
    const schedule: WeeklySchedule = {
        days: {},
        continuousHabits: [],
        warnings: [],
    };

    // 1. Separate by Category
    const activeHabits = habits.filter(h => h.category === 'active');
    schedule.continuousHabits = habits.filter(h => h.category === 'continuous');

    // 2. Initialize days for the next 7 days
    const next7Days: string[] = [];
    for (let i = 0; i < 7; i++) {
        const date = format(addDays(new Date(), i), 'yyyy-MM-dd');
        schedule.days[date] = { morning: [], night: [], totalMinutes: 0, warnings: [] };
        next7Days.push(date);
    }

    // Sort active habits to place the most frequent/highest priority ones first
    const sortedHabits = [...activeHabits].sort((a, b) => {
        const getFreqCount = (f: string) => {
            switch (f) {
                case 'daily': return 7;
                case '2_3x_weekly': return 3;
                case '1x_weekly': return 1;
                case 'weekly': return 1;
                case 'as_needed': return 2;
                default: return 7;
            }
        };
        const freqA = getFreqCount(a.frequency);
        const freqB = getFreqCount(b.frequency);
        if (freqA !== freqB) return freqB - freqA;
        return (b.priority || 0) - (a.priority || 0);
    });

    // 3. Smart Distribution using Greedy Load Balancing
    sortedHabits.forEach(habit => {
        const getFreqCount = (f: string) => {
            switch (f) {
                case 'daily': return 7;
                case '2_3x_weekly': return 3;
                case '1x_weekly': return 1;
                case 'weekly': return 1;
                case 'as_needed': return 2;
                default: return 7;
            }
        };
        const occurencesCount = getFreqCount(habit.frequency);

        for (let i = 0; i < occurencesCount; i++) {
            // Sort dates dynamically by current load (morning + night length)
            const sortedDates = [...next7Days].sort((dateA, dateB) => {
                const countA = schedule.days[dateA].morning.length + schedule.days[dateA].night.length;
                const countB = schedule.days[dateB].morning.length + schedule.days[dateB].night.length;
                return countA - countB;
            });

            let assignedDate = null;
            for (const date of sortedDates) {
                const day = schedule.days[date];
                const count = day.morning.length + day.night.length;

                if (count >= dailyLimit) continue; // Day is full

                // Prevent duplicates on the same day
                if (day.morning.some(h => h.id === habit.id) || day.night.some(h => h.id === habit.id)) {
                    continue;
                }

                assignedDate = date;
                break;
            }

            if (assignedDate) {
                const day = schedule.days[assignedDate];
                if (habit.timeOfDay === 'morning' || habit.timeOfDay === 'throughout_day') {
                    day.morning.push(habit);
                } else {
                    day.night.push(habit);
                }
                day.totalMinutes += habit.durationMinutes;
            }
        }
    });

    // 4. Warning for overloaded schedules
    if (activeHabits.length > dailyLimit * 4) { // Heuristic
        schedule.warnings.push("High goal volume. Tasks are being spread across the week to maintain recovery.");
    }

    return schedule;
}
