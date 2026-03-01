import { Home, Zap, Target, BookOpen } from 'lucide-react';

export type CranumTab = 'today' | 'reminders' | 'goals' | 'library';

interface BottomNavProps {
  activeTab: CranumTab;
  onTabChange: (tab: CranumTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: CranumTab; icon: typeof Home; label: string }[] = [
    { id: 'today', icon: Home, label: 'Today' },
    { id: 'reminders', icon: Zap, label: 'Reminders' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'library', icon: BookOpen, label: 'Library' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 nav-blur z-50">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Icon size={22} className={isActive ? 'scale-110' : ''} />
              <span className={`text-[10px] font-semibold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
