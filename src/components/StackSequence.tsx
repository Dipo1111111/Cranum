import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { HabitCard } from './HabitCard';
import { CranumHabit } from '@/types/habit';
import { StackPrescription } from '@/lib/scheduler';

interface StackSequenceProps {
    prescription: StackPrescription;
    completions: string[];
    onToggle: (habitId: string) => void;
    onClickInfo: (habit: CranumHabit) => void;
}

export function StackSequence({ prescription, completions, onToggle, onClickInfo }: StackSequenceProps) {
    const { stack, habits } = prescription;
    const [isActive, setIsActive] = useState(false);

    // Find the first uncompleted habit
    const activeHabitIndex = habits.findIndex(h => !completions.includes(h.id));
    const isFullyCompleted = activeHabitIndex === -1;

    // If not active and partially completed, auto-activate
    const hasStarted = activeHabitIndex > 0 && !isFullyCompleted;

    const handleStart = () => setIsActive(true);

    if (isFullyCompleted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-3xl bg-primary/5 border border-primary/20 flex items-center justify-between"
            >
                <div>
                    <h3 className="text-sm font-black text-primary uppercase tracking-wide flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        {stack.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Sequence completed.</p>
                </div>
                <div className="text-xs font-bold text-primary/50 tracking-widest">{habits.length}/{habits.length}</div>
            </motion.div>
        );
    }

    if (!isActive && !hasStarted) {
        return (
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleStart}
                className="p-5 rounded-3xl bg-secondary/30 border border-primary/10 cursor-pointer group transition-colors hover:bg-secondary/50"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-wide flex items-center gap-2">
                            <Layers size={16} className="text-primary" />
                            {stack.name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed pr-8">
                            {stack.description}
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <Play size={16} className="ml-1" />
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    <span>{habits.length} STEPS</span>
                    <span>•</span>
                    <span>{habits.reduce((acc, h) => acc + h.durationMinutes, 0)} MIN</span>
                </div>
            </motion.div>
        );
    }

    const currentHabit = habits[activeHabitIndex];

    return (
        <div className="p-5 rounded-3xl bg-secondary/10 border border-primary/20 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} />
                    {stack.name}
                </h3>
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground">
                    STEP {activeHabitIndex + 1} OF {habits.length}
                </div>
            </div>

            {/* Sequence Progress Bar */}
            <div className="flex gap-1 h-1">
                {habits.map((h, i) => (
                    <div
                        key={h.id}
                        className={`flex-1 rounded-full ${i < activeHabitIndex ? 'bg-primary' :
                                i === activeHabitIndex ? 'bg-primary/50 animate-pulse' : 'bg-primary/10'
                            }`}
                    />
                ))}
            </div>

            <div className="pt-2">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentHabit.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <HabitCard
                            habit={currentHabit}
                            completed={false}
                            onToggle={() => {
                                // Add slight delay for animation
                                setTimeout(() => onToggle(currentHabit.id), 400);
                            }}
                            onClickInfo={() => onClickInfo(currentHabit)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Upcoming preview */}
            {activeHabitIndex < habits.length - 1 && (
                <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-2 opacity-50">
                    <ChevronRight size={12} />
                    NEXT: {habits[activeHabitIndex + 1].name}
                </div>
            )}
        </div>
    );
}
