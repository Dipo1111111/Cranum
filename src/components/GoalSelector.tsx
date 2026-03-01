import { motion } from 'framer-motion';
import { Check, Target, Info, AlertTriangle } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { CranumGoal } from '@/types/habit';
import { CRANUM_HABITS } from '@/data/cranumData';

const GOAL_INFO: Record<CranumGoal, { title: string; desc: string; color: string }> = {
    hunter_eyes: { title: 'Hunter Eyes', desc: 'Lower upper eyelid exposure and increase lateral width.', color: 'bg-foreground/80' },
    forward_upward: { title: 'Forward & Upward', desc: 'Cranial development and facial projection.', color: 'bg-foreground/60' },
    hollow_cheeks: { title: 'Hollow Cheeks', desc: 'Fat loss and buccinator muscle atrophy.', color: 'bg-foreground/40' },
    grow_taller: { title: 'Grow Taller', desc: 'Postural correction and growth plate optimization.', color: 'bg-foreground/20' },
    jawline: { title: 'Jawline Definition', desc: 'Masseter development and submental fat reduction.', color: 'bg-foreground/10' }
};

export function GoalSelector() {
    const { selectedGoals, setGoalsHierarchy, loading, warnings } = useHabitContext();

    const handleToggle = (goalId: CranumGoal) => {
        if (selectedGoals.includes(goalId)) {
            // Deselect
            setGoalsHierarchy(selectedGoals.filter(g => g !== goalId));
        } else {
            // Select up to 3
            if (selectedGoals.length < 3) {
                setGoalsHierarchy([...selectedGoals, goalId]);
            }
        }
    };

    const getHabitCount = (goal: CranumGoal) => {
        return CRANUM_HABITS.filter(h => h.goals.includes(goal)).length;
    };

    const getTimeEstimate = (goal: CranumGoal) => {
        const habits = CRANUM_HABITS.filter(h => h.goals.includes(goal));
        const dailyMinutes = habits
            .filter(h => h.category === 'active') // Only active habits contribute to checkable time
            .reduce((sum, h) => sum + h.durationMinutes, 0);
        return dailyMinutes;
    };

    if (loading) return null;

    return (
        <div className="space-y-6 pb-10">
            <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Target Selection</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Select up to 3 goals. Your first choice is the <strong>Spearhead</strong>—the engine will prescribe active routines for it. The others are <strong>Support</strong> targets, unlocking passive lifestyle habits.
                </p>
            </div>

            {warnings.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-3 text-orange-500"
                >
                    <AlertTriangle size={20} className="flex-shrink-0" />
                    <div className="text-xs">
                        <p className="font-bold uppercase tracking-wider mb-1">Daily Limit Warning</p>
                        <p className="opacity-80">Some lower priority habits are hidden to keep your daily load under 7 tasks. Focus on the core system first.</p>
                    </div>
                </motion.div>
            )}

            <div className="space-y-3">
                {(Object.keys(GOAL_INFO) as CranumGoal[]).map((goalId) => {
                    const isSelected = selectedGoals.includes(goalId);
                    const info = GOAL_INFO[goalId];
                    const count = getHabitCount(goalId);
                    const minutes = getTimeEstimate(goalId);

                    return (
                        <button
                            key={goalId}
                            onClick={() => handleToggle(goalId)}
                            disabled={!isSelected && selectedGoals.length >= 3}
                            className={`
                w-full text-left p-5 rounded-[2rem] border transition-all duration-300 relative overflow-hidden group
                ${isSelected
                                    ? 'bg-card border-primary shadow-lg shadow-primary/5'
                                    : selectedGoals.length >= 3 ? 'bg-secondary/10 border-transparent opacity-50 cursor-not-allowed' : 'bg-secondary/30 border-transparent hover:bg-secondary/50'}
              `}
                        >
                            {isSelected && (
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">
                                        {selectedGoals.indexOf(goalId) === 0 ? 'Spearhead' : 'Support'}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                        <Check size={14} />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1 relative z-10 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${info.color}`} />
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                                        {count} {count === 1 ? 'HABIT' : 'HABITS'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                                    {info.title}
                                </h3>

                                <p className="text-xs text-muted-foreground leading-relaxed mt-1 pr-8">
                                    {info.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] text-center space-y-3">
                <Target className="mx-auto text-primary" size={24} />
                <p className="text-xs text-muted-foreground italic">
                    "Discipline is the bridge between goals and accomplishment."
                </p>
            </div>
        </div>
    );
}
