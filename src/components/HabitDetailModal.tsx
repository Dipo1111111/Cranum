import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import { CranumHabit } from '@/types/habit';

interface HabitDetailModalProps {
    habit: CranumHabit | null;
    isOpen: boolean;
    onClose: () => void;
}

export function HabitDetailModal({ habit, isOpen, onClose }: HabitDetailModalProps) {
    if (!habit) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
                    />
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl p-8 shadow-2xl"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-primary/40 mb-1">
                                        <span>Cranum Guide</span>
                                        <span>//</span>
                                        <span>{habit.goals[0]?.replace('_', ' ')}</span>
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tight leading-tight">{habit.name}</h2>
                                    <p className="text-sm border-l-2 border-primary/20 pl-4 py-1 text-muted-foreground mt-3 font-medium italic leading-relaxed">
                                        {habit.mechanism}
                                    </p>
                                </div>

                                {habit.blueprint && (
                                    <section className="space-y-6 pt-2">
                                        <div className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                                            <BookOpen size={16} />
                                            Technique Guide
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-secondary/30 rounded-2xl p-5 space-y-3">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/60">How to do it</h4>
                                                <div className="space-y-3">
                                                    {habit.blueprint.howTo.map((step, i) => (
                                                        <div key={i} className="flex gap-3 text-sm">
                                                            <span className="text-primary font-black">{i + 1}.</span>
                                                            <span className="text-muted-foreground leading-relaxed">{step}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/60">Why it works</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20 whitespace-pre-wrap">
                                                    {habit.blueprint.whyItMatters}
                                                </p>
                                            </div>

                                            {habit.blueprint.commonMistakes && (
                                                <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4">
                                                    <div className="flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">
                                                        <AlertTriangle size={12} />
                                                        Important Notes
                                                    </div>
                                                    <p className="text-xs text-orange-500/80 leading-relaxed italic whitespace-pre-wrap">
                                                        {habit.blueprint.commonMistakes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {!habit.blueprint && (
                                    <>
                                        <section className="space-y-2">
                                            <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                                <BookOpen size={16} />
                                                KNOWLEDGE
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                                {habit.knowledge}
                                            </p>
                                        </section>

                                        <div className="grid grid-cols-2 gap-4">
                                            <section className="space-y-4">
                                                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                                    <CheckCircle2 size={14} className="text-primary" />
                                                    Dos
                                                </div>
                                                <ul className="space-y-1">
                                                    {habit.dos.map((item, i) => (
                                                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                                            <span className="text-green-500">•</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                            <section className="space-y-2">
                                                <div className="flex items-center gap-2 text-destructive font-bold text-xs uppercase tracking-wider">
                                                    <AlertTriangle size={14} />
                                                    Don'ts
                                                </div>
                                                <ul className="space-y-1">
                                                    {habit.donts.map((item, i) => (
                                                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                                                            <span className="text-destructive">•</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        </div>

                                        <section className="space-y-2">
                                            <div className="flex items-center gap-2 text-accent font-bold text-sm">
                                                <Lightbulb size={16} />
                                                TIPS & TRIGGERS
                                            </div>
                                            <p className="text-sm text-muted-foreground italic pl-4 border-l-2 border-accent/20">
                                                {habit.tips}
                                            </p>
                                        </section>
                                    </>
                                )}

                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all mt-4"
                                >
                                    Got it
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
