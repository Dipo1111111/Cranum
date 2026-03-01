import { CranumHabit, CranumGoal, BiologicalStack, CranumPhase } from '../types/habit';
import { format, subHours, parseISO, differenceInHours } from 'date-fns';

export interface StackPrescription {
    stack: BiologicalStack;
    habits: CranumHabit[];
}

export interface DailyPlan {
    morning: CranumHabit[]; // Kept for backward compatibility
    night: CranumHabit[];   // Kept for backward compatibility
    morningStacks: StackPrescription[];
    nightStacks: StackPrescription[];
    throughoutDay: CranumHabit[];
    totalMinutes: number;
    warnings: string[];
}

export function generateDailyPrescription(
    allHabits: CranumHabit[],
    history: Record<string, string[]>,
    primaryGoal: CranumGoal | null,
    currentPhase: CranumPhase,
    allStacks: BiologicalStack[]
): DailyPlan {
    const plan: DailyPlan = {
        morning: [],
        night: [],
        morningStacks: [],
        nightStacks: [],
        throughoutDay: [],
        totalMinutes: 0,
        warnings: []
    };

    if (!primaryGoal) {
        plan.warnings.push("No primary target selected. Please select a goal in the Identity tab.");
        return plan;
    }

    // 1. Filter habits based on phase and goal. 
    // We only prescribe active habits that support the primary goal and are <= currentPhase
    const activeHabits = allHabits.filter(h =>
        h.category === 'active' &&
        h.goals.includes(primaryGoal) &&
        (h.phase || 1) <= currentPhase
    );

    // 2. Calculate Fatigue / Lockouts
    const flatHistory: { date: string; habitId: string }[] = [];
    Object.entries(history).forEach(([dateStr, ids]) => {
        ids.forEach(id => flatHistory.push({ date: dateStr, habitId: id }));
    });
    // Sort descending by date
    flatHistory.sort((a, b) => b.date.localeCompare(a.date));

    // A habit is locked out if the most recent completion is within its recovery window
    const lockedOutHabitIds = new Set<string>();
    const now = new Date();

    activeHabits.forEach(habit => {
        if (!habit.recoveryTimeHours) return; // No lockout needed

        const lastCompletion = flatHistory.find(h => h.habitId === habit.id);
        if (lastCompletion) {
            // For a real app, history should store exact timestamps. We only have dates ('yyyy-MM-dd').
            // Assume it was completed at 12:00 PM on that date.
            const completedDate = parseISO(lastCompletion.date + 'T12:00:00');
            const hoursSince = differenceInHours(now, completedDate);
            if (hoursSince < habit.recoveryTimeHours) {
                lockedOutHabitIds.add(habit.id);
            }
        }
    });

    // 3. Find applicable Stacks
    // We prescribe a stack if it's for the current phase, and none of its habits are locked out.
    const availableStacks = allStacks.filter(s => s.phase <= currentPhase);

    availableStacks.forEach(stack => {
        // Resolve habits for this stack
        const stackHabits = stack.habitIds
            .map(id => activeHabits.find(h => h.id === id))
            .filter((h): h is CranumHabit => h !== undefined); // Only habits that apply to primary goal

        if (stackHabits.length === 0) return; // This stack doesn't apply to the primary goal

        // Check lockouts
        const isLockedOut = stackHabits.some(h => lockedOutHabitIds.has(h.id));

        if (isLockedOut) {
            plan.warnings.push(`The ${stack.name} is skipped today for CNS/Muscular recovery.`);
            return; // Skip this stack today
        }

        const prescription: StackPrescription = { stack, habits: stackHabits };

        if (stack.timeOfDay === 'morning') {
            plan.morningStacks.push(prescription);
            plan.morning.push(...stackHabits);
        } else if (stack.timeOfDay === 'night') {
            plan.nightStacks.push(prescription);
            plan.night.push(...stackHabits);
        } else {
            plan.throughoutDay.push(...stackHabits);
            plan.morning.push(...stackHabits); // fallback
        }

        stackHabits.forEach(h => plan.totalMinutes += h.durationMinutes);
    });

    // 4. Fallback for active habits not in any stack (e.g., throughout_day habits)
    const stackedHabitIds = new Set<string>();
    plan.morningStacks.forEach(s => s.habits.forEach(h => stackedHabitIds.add(h.id)));
    plan.nightStacks.forEach(s => s.habits.forEach(h => stackedHabitIds.add(h.id)));

    activeHabits.forEach(habit => {
        if (!stackedHabitIds.has(habit.id) && !lockedOutHabitIds.has(habit.id)) {
            if (habit.timeOfDay === 'throughout_day') {
                plan.throughoutDay.push(habit);
                plan.morning.push(habit); // Keep backward compatible checkable list
                plan.totalMinutes += habit.durationMinutes;
            } else if (habit.timeOfDay === 'morning') {
                // Throw it into a generic morning pool if not in a stack
                plan.morning.push(habit);
                plan.totalMinutes += habit.durationMinutes;
            } else if (habit.timeOfDay === 'night') {
                plan.night.push(habit);
                plan.totalMinutes += habit.durationMinutes;
            }
        }
    });

    // Ensure we don't exceed the 8 task hard limit
    const totalTasks = plan.morning.length + plan.night.length;
    if (totalTasks > 8) {
        plan.warnings.push("High intensity day: Hard limit of 8 tasks reached. Remaining tasks pushed to tomorrow.");
        // Trim to 8 tasks
        const trimOverhead = totalTasks - 8;
        if (plan.night.length >= trimOverhead) {
            plan.night = plan.night.slice(0, plan.night.length - trimOverhead);
        } else {
            plan.night = [];
            plan.morning = plan.morning.slice(0, 8);
        }
    }

    return plan;
}
