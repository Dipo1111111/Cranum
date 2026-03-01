import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Bell, Calendar, User, ListTodo, Database, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { NotificationsState } from '@/hooks/useNotifications';
import { SystemAlertsMenu } from './SystemAlertsMenu';
import { AbbeyScheduleMenu } from './AbbeyScheduleMenu';
import { ManageHabitsMenu } from './ManageHabitsMenu';
import { DataManagementMenu } from './DataManagementMenu';
import { HelpSupportMenu } from './HelpSupportMenu';
import { CharacterSelect } from '@/components/CharacterSelect';

// Define the available sub-screens
export type SettingsViewType = 'home' | 'alerts' | 'schedule' | 'identity' | 'habits' | 'data' | 'help';

interface SettingsScreenProps {
    habits: Habit[];
    notifications: NotificationsState;
    onUpdateHabit: (id: string, updates: Partial<Omit<Habit, 'id'>>) => void;
    onDeleteHabit: (id: string) => void;
    onReorderHabits: (habits: Habit[]) => void;
}

export function SettingsScreen(props: SettingsScreenProps) {
    const [activeView, setActiveView] = useState<SettingsViewType>('home');

    // Navigate back to the main menu
    const goBack = () => {
        setActiveView('home');
        // If we go back manually, we should also pop the history state if it exists
        // However, a simple window.history.back() will trigger the popstate listener
        window.history.back();
    };

    const handleNavigate = (view: SettingsViewType) => {
        window.history.pushState({ isSettingsSubScreen: true }, '');
        setActiveView(view);
    };

    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (activeView !== 'home') {
                setActiveView('home');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [activeView]);

    return (
        <div className="grid grid-cols-1 grid-rows-1 relative w-full overflow-x-hidden">
            <AnimatePresence initial={false}>
                {activeView === 'home' ? (
                    <SettingsHome key="home" onNavigate={handleNavigate} />
                ) : (
                    <SettingsSubScreen key={activeView} view={activeView} onBack={goBack} {...props} />
                )}
            </AnimatePresence>
        </div>
    );
}

// ----------------------------------------------------------------------
// LEVEL 1: Settings Home
// ----------------------------------------------------------------------

interface SettingsHomeProps {
    onNavigate: (view: SettingsViewType) => void;
}

function SettingsHome({ onNavigate }: SettingsHomeProps) {
    const rows = [
        { id: 'alerts', label: 'System Alerts', icon: Bell },
        { id: 'schedule', label: 'Habit Schedule', icon: Calendar },
        { id: 'identity', label: 'Identity', icon: User },
        { id: 'habits', label: 'Manage Habits', icon: ListTodo },
        { id: 'data', label: 'Data Management', icon: Database },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
    ] as const;

    return (
        <motion.div
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
            exit={{ x: '-30%', opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
            className="col-start-1 row-start-1 w-full pb-24"
        >
            <h2 className="text-xl font-semibold text-foreground font-heading mb-6 pl-2">Settings</h2>

            <div className="flex flex-col space-y-2">
                {rows.map((row) => (
                    <button
                        key={row.id}
                        onClick={() => onNavigate(row.id as SettingsViewType)}
                        className="flex items-center justify-between w-full p-4 rounded-xl border border-border transition-colors duration-100 ease-in-out hover:bg-muted text-left"
                        style={{ backgroundColor: 'var(--color-bg-card)' }}
                    >
                        <div className="flex items-center gap-3">
                            <row.icon size={20} className="text-primary" style={{ color: 'var(--color-accent)' }} />
                            <span className="text-[15px] font-semibold text-foreground" style={{ color: 'var(--color-text-primary)' }}>
                                {row.label}
                            </span>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

// ----------------------------------------------------------------------
// LEVEL 2: Sub-Screens Wrapper
// ----------------------------------------------------------------------

interface SettingsSubScreenProps extends SettingsScreenProps {
    view: SettingsViewType;
    onBack: () => void;
}

function SettingsSubScreen({ view, onBack, ...props }: SettingsSubScreenProps) {
    // Push a state so hardware back button works. We'll add this later.

    const getHeaderTitle = () => {
        switch (view) {
            case 'alerts': return 'System Alerts';
            case 'schedule': return 'Habit Schedule';
            case 'identity': return 'Identity';
            case 'habits': return 'Manage Habits';
            case 'data': return 'Data Management';
            case 'help': return 'Help & Support';
            default: return '';
        }
    };

    return (
        <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
            exit={{ x: '100%', opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
            className="col-start-1 row-start-1 w-full z-20 pb-24"
        >
            {/* Header */}
            <div
                className="flex items-center gap-3 pb-4 pt-2 border-b border-border backdrop-blur-md"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
                <button
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                    <ArrowLeft size={24} style={{ color: 'var(--color-accent)' }} />
                </button>
                <h2 className="text-lg font-semibold font-heading" style={{ color: 'var(--color-text-primary)' }}>
                    {getHeaderTitle()}
                </h2>
            </div>

            {/* Content Injection */}
            <div className="px-1 w-full">
                {view === 'alerts' && <SystemAlertsMenu notifications={props.notifications} />}
                {view === 'schedule' && <AbbeyScheduleMenu habits={props.habits} notifications={props.notifications} />}
                {view === 'identity' && (
                    <div className="space-y-4">
                        <CharacterSelect />
                    </div>
                )}
                {view === 'habits' && (
                    <ManageHabitsMenu
                        habits={props.habits}
                        onUpdateHabit={props.onUpdateHabit}
                        onDeleteHabit={props.onDeleteHabit}
                        onReorderHabits={props.onReorderHabits}
                    />
                )}
                {view === 'data' && <DataManagementMenu />}
                {view === 'help' && <HelpSupportMenu />}
            </div>
        </motion.div>
    );
}
