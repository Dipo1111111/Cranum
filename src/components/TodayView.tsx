import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitDetailModal } from './HabitDetailModal';
import { CranumHabit } from '@/types/habit';

export function TodayView() {
    const { todayPlan, completions, toggleHabit } = useHabitContext();
    const [selectedHabit, setSelectedHabit] = useState<CranumHabit | null>(null);
    const [expandedSections, setExpandedSections] = useState({
        morning: true,
        night: true
    });

    const isHabitCompleted = (id: string) => (completions || []).includes(id);

    const morningHabits = (todayPlan?.morning || []).filter(h => h.category === 'active');
    const nightHabits = (todayPlan?.night || []).filter(h => h.category === 'active');

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const SectionHeader = ({
        title,
        icon: Icon,
        count,
        id,
        isExpanded
    }: {
        title: string,
        icon: any,
        count: number,
        id: keyof typeof expandedSections,
        isExpanded: boolean
    }) => (
        <button
            onClick={() => toggleSection(id)}
            className="flex items-center justify-between w-full py-4 group"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                </div>
                <div className="text-left">
                    <h2 className="text-sm font-black uppercase tracking-widest">{title}</h2>
                    <span className="text-[10px] text-muted-foreground font-bold">
                        {count} {count === 1 ? 'TASK' : 'TASKS'}
                    </span>
                </div>
            </div>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
    );

    return (
        <div className="space-y-4">
            {/* Morning Section */}
            <section className="space-y-2">
                <SectionHeader
                    id="morning"
                    title="Morning"
                    icon={Sun}
                    count={morningHabits.length}
                    isExpanded={expandedSections.morning}
                />
                <AnimatePresence>
                    {expandedSections.morning && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3 overflow-hidden"
                        >
                            {morningHabits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    completed={isHabitCompleted(habit.id)}
                                    onToggle={() => toggleHabit(habit.id)}
                                    onClickInfo={() => setSelectedHabit(habit)}
                                />
                            ))}
                            {morningHabits.length === 0 && (
                                <p className="text-center py-6 text-xs text-muted-foreground italic">No morning habits scheduled.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Night Section */}
            <section className="space-y-2">
                <SectionHeader
                    id="night"
                    title="Night"
                    icon={Moon}
                    count={nightHabits.length}
                    isExpanded={expandedSections.night}
                />
                <AnimatePresence>
                    {expandedSections.night && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3 overflow-hidden"
                        >
                            {nightHabits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    completed={isHabitCompleted(habit.id)}
                                    onToggle={() => toggleHabit(habit.id)}
                                    onClickInfo={() => setSelectedHabit(habit)}
                                />
                            ))}
                            {nightHabits.length === 0 && (
                                <p className="text-center py-6 text-xs text-muted-foreground italic">No night habits scheduled.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <HabitDetailModal
                habit={selectedHabit}
                isOpen={!!selectedHabit}
                onClose={() => setSelectedHabit(null)}
            />
        </div>
    );
}
