import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, ChevronDown, ChevronRight, Layers, Clock } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitDetailModal } from './HabitDetailModal';
import { CranumHabit } from '@/types/habit';
import { StackPrescription } from '@/lib/scheduler';

export function TodayView() {
    const { todayPlan, completions, toggleHabit, currentPhase, primaryGoal } = useHabitContext();
    const [selectedHabit, setSelectedHabit] = useState<CranumHabit | null>(null);
    const [expandedSections, setExpandedSections] = useState({
        morning: true,
        throughout: true,
        night: true
    });

    const isHabitCompleted = (id: string) => (completions || []).includes(id);

    const morningStacks = todayPlan?.morningStacks || [];
    const nightStacks = todayPlan?.nightStacks || [];
    const throughoutDay = todayPlan?.throughoutDay || [];

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

    const renderStack = (prescription: StackPrescription) => (
        <div key={prescription.stack.id} className="mb-4 p-4 rounded-3xl bg-secondary/20 border border-primary/10">
            <div className="mb-4">
                <h3 className="text-sm font-black text-primary flex items-center gap-2 uppercase tracking-wide">
                    <Layers size={14} />
                    {prescription.stack.name}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    {prescription.stack.description}
                </p>
            </div>
            <div className="space-y-2 relative before:absolute before:left-3 before:top-2 before:bottom-6 before:w-[2px] before:bg-border/50">
                {prescription.habits.map((habit, index) => (
                    <div key={habit.id} className="relative z-10 pl-8">
                        {/* Custom sequence indicator */}
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center text-[8px] font-bold text-primary">
                            {index + 1}
                        </div>
                        <HabitCard
                            habit={habit}
                            completed={isHabitCompleted(habit.id)}
                            onToggle={() => toggleHabit(habit.id)}
                            onClickInfo={() => setSelectedHabit(habit)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 pb-10">
            {/* Phase Progression Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 mb-6 flex items-center justify-between overflow-hidden relative">
                <div className="absolute -right-4 -top-4 opacity-5">
                    <Zap size={100} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-primary font-black uppercase tracking-widest text-xs mb-1">Current Ascension Phase</h2>
                    <p className="text-2xl font-black text-foreground">Phase {currentPhase}: <span className="opacity-50 font-medium text-lg">{currentPhase === 1 ? 'Foundation' : currentPhase === 2 ? 'Unlocking' : 'Hypertrophy'}</span></p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/20 flex flex-col items-center justify-center relative z-10">
                    <span className="text-[10px] font-bold uppercase text-primary mb-[-2px]">LVL</span>
                    <span className="text-lg font-black text-primary leading-none">{currentPhase}</span>
                </div>
            </div>

            {/* Morning Section */}
            <section className="space-y-2">
                <SectionHeader
                    id="morning"
                    title="Morning Stacks"
                    icon={Sun}
                    count={morningStacks.reduce((acc, s) => acc + s.habits.length, 0)}
                    isExpanded={expandedSections.morning}
                />
                <AnimatePresence>
                    {expandedSections.morning && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-4 overflow-hidden"
                        >
                            {morningStacks.map(renderStack)}
                            {morningStacks.length === 0 && (
                                <p className="text-center py-6 text-xs text-muted-foreground italic bg-secondary/10 rounded-2xl border border-dashed border-border/50">No morning stacks prescribed today.</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Throughout Day Section */}
            {(throughoutDay.length > 0 || expandedSections.throughout) && (
                <section className="space-y-2">
                    <SectionHeader
                        id="throughout"
                        title="Throughout Day"
                        icon={Clock}
                        count={throughoutDay.length}
                        isExpanded={expandedSections.throughout}
                    />
                    <AnimatePresence>
                        {expandedSections.throughout && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-3 overflow-hidden"
                            >
                                {throughoutDay.map(habit => (
                                    <HabitCard
                                        key={habit.id}
                                        habit={habit}
                                        completed={isHabitCompleted(habit.id)}
                                        onToggle={() => toggleHabit(habit.id)}
                                        onClickInfo={() => setSelectedHabit(habit)}
                                    />
                                ))}
                                {throughoutDay.length === 0 && (
                                    <p className="text-center py-6 text-xs text-muted-foreground italic bg-secondary/10 rounded-2xl border border-dashed border-border/50">No continuous tasks prescribed.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            )}

            {/* Night Section */}
            <section className="space-y-2">
                <SectionHeader
                    id="night"
                    title="Night Stacks"
                    icon={Moon}
                    count={nightStacks.reduce((acc, s) => acc + s.habits.length, 0)}
                    isExpanded={expandedSections.night}
                />
                <AnimatePresence>
                    {expandedSections.night && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-4 overflow-hidden"
                        >
                            {nightStacks.map(renderStack)}
                            {nightStacks.length === 0 && (
                                <p className="text-center py-6 text-xs text-muted-foreground italic bg-secondary/10 rounded-2xl border border-dashed border-border/50">No night stacks prescribed today.</p>
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
