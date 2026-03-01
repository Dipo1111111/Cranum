import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';
import { format, subDays, getDay } from 'date-fns';

interface StreakDisplayProps {
  history: Record<string, string[]>;
  schedule: any;
}

export function StreakDisplay({ history, schedule }: StreakDisplayProps) {
  const streak = useMemo(() => {
    let current = 0;
    let longest = 0;
    let tempLongest = 0;

    // Check backwards from today
    const checkDay = (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayOfWeek = getDay(date);
      const completions = history[dateStr] || [];
      const dayPlan = schedule.days[dayOfWeek];
      const totalScheduled = (dayPlan?.morning?.length || 0) + (dayPlan?.night?.length || 0);

      if (totalScheduled === 0) return true; // Free pass if nothing scheduled
      const rate = (completions.length / totalScheduled) * 100;
      return rate >= 70;
    };

    // Calculate current streak
    let date = new Date();
    // If today is not successful, check if yesterday was. If so, streak starts from yesterday.
    // If today is successful, streak includes today.
    if (!checkDay(date)) {
      date = subDays(date, 1);
    }

    for (let i = 0; i < 365; i++) {
      if (checkDay(date)) {
        current++;
        date = subDays(date, 1);
      } else {
        break;
      }
    }

    // Calculate longest (simplified for now, scan last 60 days)
    let scanDate = subDays(new Date(), 60);
    for (let i = 0; i < 60; i++) {
      if (checkDay(scanDate)) {
        tempLongest++;
      } else {
        longest = Math.max(longest, tempLongest);
        tempLongest = 0;
      }
      scanDate = new Date(scanDate.getTime() + 24 * 60 * 60 * 1000);
    }
    longest = Math.max(longest, tempLongest, current);

    return { current, longest };
  }, [history, schedule]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm flex flex-col items-center text-center justify-center space-y-2">
        <motion.div
          animate={streak.current > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Flame size={32} className={streak.current > 0 ? 'text-primary' : 'text-muted-foreground/30'} fill="currentColor" />
        </motion.div>
        <div>
          <p className="text-2xl font-black tracking-tighter">{streak.current}</p>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Day Streak</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm flex flex-col items-center text-center justify-center space-y-2">
        <Trophy size={32} className="text-accent" />
        <div>
          <p className="text-2xl font-black tracking-tighter">{streak.longest}</p>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Best Streak</p>
        </div>
      </div>
    </div>
  );
}