import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, ChevronRight, Filter } from 'lucide-react';
import { CRANUM_HABITS } from '@/data/cranumData';
import { CranumGoal, CranumHabit } from '@/types/habit';
import { HabitDetailModal } from './HabitDetailModal';

const GOALS: { id: CranumGoal | 'all'; title: string }[] = [
    { id: 'all', title: 'All Habits' },
    { id: 'hunter_eyes', title: 'Hunter Eyes' },
    { id: 'forward_upward', title: 'Forward' },
    { id: 'hollow_cheeks', title: 'Hollow Cheeks' },
    { id: 'grow_taller', title: 'Height' },
    { id: 'jawline', title: 'Jawline' },
];

export function GuideView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeGoal, setActiveGoal] = useState<CranumGoal | 'all'>('all');
    const [selectedHabit, setSelectedHabit] = useState<CranumHabit | null>(null);

    const filteredHabits = CRANUM_HABITS.filter(habit => {
        const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            habit.mechanism.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGoal = activeGoal === 'all' || habit.goals.includes(activeGoal as CranumGoal);
        return matchesSearch && matchesGoal;
    });

    return (
        <div className="space-y-6 pb-20">
            <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Knowledge Repository</h2>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search mechanisms, habits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-transparent focus:border-primary/30 rounded-2xl outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
                {GOALS.map(goal => (
                    <button
                        key={goal.id}
                        onClick={() => setActiveGoal(goal.id)}
                        className={`
              whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
              ${activeGoal === goal.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'}
            `}
                    >
                        {goal.title}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredHabits.map((habit, i) => (
                    <motion.button
                        key={habit.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.01 }}
                        onClick={() => setSelectedHabit(habit)}
                        className="w-full text-left bg-card border border-border/50 rounded-3xl p-5 hover:border-primary/30 transition-all group flex items-center justify-between shadow-sm"
                    >
                        <div className="space-y-1">
                            <span className="text-[9px] font-black text-primary uppercase tracking-tighter opacity-70">
                                {habit.goals[0].replace('_', ' ')} · {habit.frequency.replace('_', ' ')}
                            </span>
                            <h3 className="text-lg font-black tracking-tight leading-none group-hover:text-primary transition-colors">
                                {habit.name}
                            </h3>
                            <p className="text-[11px] text-muted-foreground font-medium italic">
                                {habit.mechanism}
                            </p>
                        </div>
                        <ChevronRight size={20} className="text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                ))}

                {filteredHabits.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <Book className="mx-auto text-muted-foreground/20" size={48} />
                        <p className="text-sm text-muted-foreground italic">No research data found for your search.</p>
                    </div>
                )}
            </div>

            <HabitDetailModal
                habit={selectedHabit}
                isOpen={!!selectedHabit}
                onClose={() => setSelectedHabit(null)}
            />
        </div>
    );
}
