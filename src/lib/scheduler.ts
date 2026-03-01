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
    selectedGoals: CranumGoal[],
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

    if (selectedGoals.length === 0) {
        plan.warnings.push("No targets selected. Please select at least one goal in the Identity tab.");
        return plan;
    }

    const spearhead = selectedGoals[0];

    // 1. Filter habits based on phase and goal. 
    // ACTIVE habits only for Spearhead
    const spearheadActiveHabits = allHabits.filter(h =>
        h.category === 'active' &&
        h.goals.includes(spearhead) &&
        (h.phase || 1) <= currentPhase
    );

    // PASSIVE/CONTINUOUS habits for ALL selected goals
    const passiveHabits = allHabits.filter(h =>
        h.category === 'continuous' &&
        h.goals.some(g => selectedGoals.includes(g as any)) &&
        (h.phase || 1) <= currentPhase
    );

    // 2. Calculate Fatigue / Lockouts for Spearhead Active Habits
    const flatHistory: { date: string; habitId: string }[] = [];
    Object.entries(history).forEach(([dateStr, ids]) => {
        ids.forEach(id => flatHistory.push({ date: dateStr, habitId: id }));
    });
    // Sort descending by date
    flatHistory.sort((a, b) => b.date.localeCompare(a.date));

    const lockedOutHabitIds = new Set<string>();
    const now = new Date();

    spearheadActiveHabits.forEach(habit => {
        if (!habit.recoveryTimeHours) return;

        const lastCompletion = flatHistory.find(h => h.habitId === habit.id);
        if (lastCompletion) {
            const completedDate = parseISO(lastCompletion.date + 'T12:00:00');
            const hoursSince = differenceInHours(now, completedDate);
            if (hoursSince < habit.recoveryTimeHours) {
                lockedOutHabitIds.add(habit.id);
            }
        }
    });

    // 3. Find applicable Stacks for Spearhead
    const availableStacks = allStacks.filter(s => s.phase <= currentPhase);

    availableStacks.forEach(stack => {
        const stackHabits = stack.habitIds
            .map(id => spearheadActiveHabits.find(h => h.id === id))
            .filter((h): h is CranumHabit => h !== undefined);

        if (stackHabits.length === 0) return;

        const isLockedOut = stackHabits.some(h => lockedOutHabitIds.has(h.id));
        if (isLockedOut) {
            plan.warnings.push(`The ${stack.name} is skipped today for CNS/Muscular recovery.`);
            return;
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
            plan.morning.push(...stackHabits);
        }

        stackHabits.forEach(h => plan.totalMinutes += h.durationMinutes);
    });

    // 4. Fallback for active habits not in any stack
    const stackedHabitIds = new Set<string>();
    plan.morningStacks.forEach(s => s.habits.forEach(h => stackedHabitIds.add(h.id)));
    plan.nightStacks.forEach(s => s.habits.forEach(h => stackedHabitIds.add(h.id)));

    spearheadActiveHabits.forEach(habit => {
        if (!stackedHabitIds.has(habit.id) && !lockedOutHabitIds.has(habit.id)) {
            if (habit.timeOfDay === 'throughout_day') {
                plan.throughoutDay.push(habit);
                plan.morning.push(habit);
                plan.totalMinutes += habit.durationMinutes;
            } else if (habit.timeOfDay === 'morning') {
                plan.morning.push(habit);
                plan.totalMinutes += habit.durationMinutes;
            } else if (habit.timeOfDay === 'night') {
                plan.night.push(habit);
                plan.totalMinutes += habit.durationMinutes;
            }
        }
    });

    // 5. Add Passive habits (Support goals) to throughoutDay
    passiveHabits.forEach(habit => {
        // Avoid duplicates if already added as active (though categories should be distinct)
        if (!plan.throughoutDay.some(h => h.id === habit.id)) {
            plan.throughoutDay.push(habit);
            // Continuous habits don't usually add 'minutes' to the budget as they are background
        }
    });

    // Ensure we don't exceed the 8 task hard limit for ACTIVE routines
    const totalTasks = plan.morning.length + plan.night.length;
    if (totalTasks > 8) {
        plan.warnings.push("High intensity day: Hard limit of 8 tasks reached. Remaining tasks pushed to tomorrow.");
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
