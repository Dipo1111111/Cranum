import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap, ChevronDown, ChevronRight, Layers, Clock, Check } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { HabitCard } from './HabitCard';
import { HabitDetailModal } from './HabitDetailModal';
import { StackSequence } from './StackSequence';
import { CranumHabit } from '@/types/habit';
import { StackPrescription } from '@/lib/scheduler';

export function TodayView() {
    const { todayPlan, completions, toggleHabit, currentPhase, phaseProgress, primaryGoal } = useHabitContext();
    const [selectedHabit, setSelectedHabit] = useState<CranumHabit | null>(null);

    // Chronobiological UI: Auto-focus based on time of day
    const hour = new Date().getHours();
    const isMorning = hour < 16; // Before 4 PM

    const [expandedSections, setExpandedSections] = useState({
        morning: isMorning,
        night: !isMorning
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
        <StackSequence
            key={prescription.stack.id}
            prescription={prescription}
            completions={completions || []}
            onToggle={toggleHabit}
            onClickInfo={setSelectedHabit}
        />
    );

    return (
        <div className="space-y-6 pb-10">
            {/* Phase Progression Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 mb-6 overflow-hidden relative">
                <div className="absolute -right-4 -top-4 opacity-5">
                    <Zap size={100} />
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div>
                        <h2 className="text-primary font-black uppercase tracking-widest text-xs mb-1">Current Ascension Phase</h2>
                        <p className="text-2xl font-black text-foreground">Phase {currentPhase}: <span className="opacity-50 font-medium text-lg">{currentPhase === 1 ? 'Foundation' : currentPhase === 2 ? 'Unlocking' : 'Hypertrophy'}</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex flex-col items-center justify-center">
                        <span className="text-[10px] font-bold uppercase text-primary mb-[-2px]">LVL</span>
                        <span className="text-lg font-black text-primary leading-none">{currentPhase}</span>
                    </div>
                </div>

                {currentPhase < 3 && (
                    <div className="relative z-10 space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
                            <span>Phase {currentPhase + 1} Unlock Progress</span>
                            <span>{phaseProgress.currentStreak} / {phaseProgress.requiredDays} Days</span>
                        </div>
                        <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${Math.min(100, (phaseProgress.currentStreak / phaseProgress.requiredDays) * 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground pt-1">Require {phaseProgress.requiredDays} days of 3+ completed habits to ascend.</p>
                    </div>
                )}
            </div>

            {/* Biological Readiness HUD */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CNS Ready</span>
                        <span className="text-[10px] font-black text-primary">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
                    </div>
                </div>
                <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Muscle Recov</span>
                        <span className="text-[10px] font-black text-blue-500">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                    </div>
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

            {/* Throughout Day / Passive HUD */}
            {throughoutDay.length > 0 && (
                <div className="bg-secondary/20 border border-primary/10 rounded-3xl p-5 mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                        <Zap size={12} />
                        Active Background Protocols
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {throughoutDay.map(habit => {
                            const isDone = isHabitCompleted(habit.id);
                            return (
                                <button
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`text-xs px-3 py-2 rounded-full border flex items-center gap-2 transition-all ${isDone
                                        ? 'bg-primary/20 border-primary/30 text-primary shadow-inner'
                                        : 'bg-background border-border text-muted-foreground hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`w-3 h-3 rounded-full border ${isDone ? 'bg-primary border-primary' : 'border-muted-foreground'} flex items-center justify-center`}>
                                        {isDone && <Check size={8} className="text-primary-foreground" />}
                                    </div>
                                    <span className="font-semibold">{habit.name}</span>
                                    <span style={{ fontSize: '10px' }} className="opacity-50 ml-1" onClick={(e) => { e.stopPropagation(); setSelectedHabit(habit); }}>ℹ️</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
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
