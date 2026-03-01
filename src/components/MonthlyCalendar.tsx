import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, getDay, getDate, eachDayOfInterval, isToday } from 'date-fns';

interface MonthlyCalendarProps {
  history: Record<string, string[]>;
  schedule: any; // WeeklySchedule from scheduler.ts
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onDayClick: (date: string) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function MonthlyCalendar({ history, schedule, currentMonth, onMonthChange, onDayClick }: MonthlyCalendarProps) {
  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const interval = eachDayOfInterval({ start, end });

    return interval.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayOfWeek = getDay(date);
      const completions = history[dateStr] || [];
      const dayPlan = schedule.days[dayOfWeek];

      const totalScheduled = (dayPlan?.morning?.length || 0) + (dayPlan?.night?.length || 0);
      const completionRate = totalScheduled === 0 ? 100 : (completions.length / totalScheduled) * 100;
      const isSuccess = completionRate >= 70;

      return {
        dateStr,
        day: getDate(date),
        isSuccess,
        isToday: isToday(date),
        hasActivity: completions.length > 0
      };
    });
  }, [currentMonth, history, schedule]);

  const startPadding = getDay(startOfMonth(currentMonth));

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    onMonthChange(newDate);
  };

  return (
    <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigateMonth(-1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <CalendarIcon size={16} className="text-primary" />
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button onClick={() => navigateMonth(1)} className="p-2 rounded-full hover:bg-secondary transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-[10px] font-black text-muted-foreground uppercase opacity-50">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square" />
        ))}
        {days.map((item, i) => (
          <motion.button
            key={item.dateStr}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.01 }}
            onClick={() => onDayClick(item.dateStr)}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all relative
              ${item.isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
              ${item.hasActivity
                ? (item.isSuccess ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-secondary/80 text-foreground')
                : 'bg-secondary/20 text-muted-foreground/50 hover:bg-secondary/40'}
            `}
          >
            {item.day}
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Ascended (≥70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary/80" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Partial</span>
        </div>
      </div>
    </div>
  );
}