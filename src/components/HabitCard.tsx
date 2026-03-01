import { motion } from 'framer-motion';
import { Clock, Info, CheckCircle2, Circle } from 'lucide-react';
import { CranumHabit } from '@/types/habit';

interface HabitCardProps {
  habit: CranumHabit;
  completed?: boolean;
  onToggle?: () => void;
  onClickInfo?: () => void;
  isContinuous?: boolean;
}

export function HabitCard({
  habit,
  completed,
  onToggle,
  onClickInfo,
  isContinuous = false
}: HabitCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative group flex items-start gap-4 p-4 rounded-3xl transition-all duration-300
        ${completed ? 'bg-secondary/30 opacity-70' : 'bg-card border border-border/50 hover:border-primary/30 shadow-sm'}
        ${isContinuous ? 'border-dashed' : ''}
      `}
    >
      {!isContinuous && onToggle && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`mt-1 transition-colors ${completed ? 'text-primary' : 'text-muted-foreground/30 hover:text-primary/50'}`}
        >
          {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
      )}

      <div className="flex-1 min-w-0" onClick={onClickInfo}>
        <div className="flex items-center gap-2 mb-1">
          {isContinuous && (
            <span className="text-[9px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">
              Reminder
            </span>
          )}
          {habit.durationMinutes !== undefined && !isContinuous && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock size={10} />
              <span className="text-[10px] font-medium tracking-widest text-[#999] uppercase">
                {habit.durationMinutes > 0 ? `${habit.durationMinutes} min` : 'During Meals'}
              </span>
            </div>
          )}
        </div>

        <h3 className={`font-bold text-foreground leading-tight ${completed ? 'line-through opacity-60' : ''}`}>
          {habit.name}
        </h3>

        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">
          {habit.tips}
        </p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onClickInfo?.(); }}
        className="mt-1 p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
      >
        <Info size={18} />
      </button>
    </motion.div>
  );
}
