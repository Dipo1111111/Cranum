import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useHabitContext } from '@/context/HabitContext';
import { BottomNav, CranumTab } from '@/components/BottomNav';
import { TodayView } from '@/components/TodayView';
import { RemindersView } from '@/components/RemindersView';
import { LibraryView } from '@/components/LibraryView';
import { GoalSelector } from '@/components/GoalSelector';
import { CranumLoader } from '@/components/CranumLoader';

const Index = () => {
  const [activeTab, setActiveTab] = useState<CranumTab>('today');
  const { signOut } = useAuth();
  const nav = useNavigate();

  const {
    loading,
    selectedGoals,
    todayPlan,
    stats
  } = useHabitContext();

  const isFirstTime = selectedGoals.length === 0 && !loading;
  const totalTasks = stats.activeTasks;
  const totalMinutes = stats.activeMinutes;

  // If first time (no goals selected), default to goals tab
  useEffect(() => {
    if (isFirstTime) {
      setActiveTab('goals');
    }
  }, [isFirstTime]);

  const handleSignOut = async () => {
    await signOut();
    nav('/');
  };

  if (loading) {
    return <CranumLoader />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => nav('/')}
            className="flex flex-col text-left hover:opacity-70 transition-opacity"
          >
            <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">CRANUM</span>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight capitalize leading-none">{activeTab}</h1>
              {activeTab === 'today' && totalTasks > 0 && (
                <span className="text-[9px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {totalTasks} {totalTasks === 1 ? 'TASK' : 'TASKS'}
                </span>
              )}
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header >

      {/* Main Content */}
      < main className="max-w-md mx-auto px-6 pt-20" >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'today' && <TodayView />}
            {activeTab === 'reminders' && <RemindersView />}
            {activeTab === 'goals' && <GoalSelector />}
            {activeTab === 'library' && <LibraryView />}
          </motion.div>
        </AnimatePresence>
      </main >

      {/* Bottom Navigation */}
      < BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div >
  );
};

export default Index;
