import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { useGoals } from '@/hooks/useGoals';
import { MonthlyCalendar } from './MonthlyCalendar';
import { StreakDisplay } from './StreakDisplay';
import { FASTVIEW_HABITS } from '@/data/fastviewData';

export function ProgressView() {
    const { history, completions, schedule, completionRate } = useHabits();
    const { selectedGoals } = useGoals();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const activeHabits = FASTVIEW_HABITS.filter(h => selectedGoals.includes(h.goal));

    return (
        <div className="space-y-6 pb-20">
            {/* Today Overview */}
            <section className="space-y-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Daily Mastery</h2>
                <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                        <BarChart3 size={120} />
                    </div>

                    <div className="relative z-10 flex items-end justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Completion Rate</span>
                            <p className="text-5xl font-black tracking-tighter text-primary">
                                {Math.round(completionRate)}%
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mastery Status</span>
                            <p className="font-bold text-sm uppercase">
                                {completionRate >= 70 ? 'Ascendent' : 'In Training'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionRate}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            </section>

            {/* Momentum */}
            <section className="space-y-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Momentum</h2>
                <StreakDisplay history={history} schedule={schedule} />
            </section>

            {/* Goal Development */}
            <section className="space-y-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Goal Development</h2>
                <div className="grid grid-cols-1 gap-3">
                    {selectedGoals.map(goal => {
                        const goalHabits = activeHabits.filter(h => h.goal === goal);
                        const completedForGoalCount = completions.filter(id => goalHabits.find(h => h.id === id)).length;
                        const totalScheduledForGoalCount = goalHabits.length; // Approximate
                        const perc = totalScheduledForGoalCount === 0 ? 0 : (completedForGoalCount / totalScheduledForGoalCount) * 100;

                        return (
                            <div key={goal} className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-black uppercase tracking-widest opacity-60 font-inter">{goal.replace('_', ' ')}</span>
                                    <span className="text-xs font-bold text-primary">{Math.round(perc)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${perc}%` }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Calendar */}
            <section className="space-y-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Historical Data</h2>
                <MonthlyCalendar
                    history={history}
                    schedule={schedule}
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    onDayClick={() => { }}
                />
            </section>
        </div>
    );
}
