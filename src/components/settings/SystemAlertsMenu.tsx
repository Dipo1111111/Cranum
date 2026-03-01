import { Bell, BellOff, AlertTriangle, FileText, Calendar } from 'lucide-react';
import { NotificationsState } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface SystemAlertsMenuProps {
    notifications: NotificationsState;
}

export function SystemAlertsMenu({ notifications }: SystemAlertsMenuProps) {
    const {
        permission,
        requestPermission,
        globalSettings,
        updateGlobalSettings
    } = notifications;

    const toggleGlobal = (key: keyof typeof globalSettings.enabledAlerts) => {
        updateGlobalSettings({
            enabledAlerts: {
                ...globalSettings.enabledAlerts,
                [key]: !globalSettings.enabledAlerts[key]
            }
        });
    };

    const handleEnableNotifications = async () => {
        const granted = await requestPermission();
        if (granted) toast.success('Notifications enabled!');
        else toast.error('Please enable notifications in your browser settings');
    };

    if (permission !== 'granted') {
        return (
            <div className="card-elevated">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {permission === 'denied' ? <BellOff size={24} className="text-destructive" /> : <Bell size={24} className="text-primary" />}
                        <div>
                            <p className="font-medium text-foreground">Enable Notifications</p>
                            <p className="text-sm text-muted-foreground">Required for all alerts</p>
                        </div>
                    </div>
                    <button onClick={handleEnableNotifications} className="btn-primary text-sm">
                        Enable
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="card-elevated space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Bell size={18} className="text-primary" />
                System Alerts
            </h3>

            <div className="space-y-3">
                {/* Missed Habit Alert */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-amber-500" />
                        <div>
                            <p className="font-medium text-sm">Missed Habit Alert</p>
                            <p className="text-xs text-muted-foreground">Daily notification for incomplete habits</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="time"
                            value={globalSettings.missedAlertTime}
                            onChange={(e) => updateGlobalSettings({ missedAlertTime: e.target.value })}
                            className="bg-transparent border-b border-border w-[60px] text-xs focus:outline-none"
                        />
                        <button
                            onClick={() => toggleGlobal('missedHabits')}
                            className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.missedHabits ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>
                </div>

                {/* Daily Summary */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-blue-500" />
                        <div>
                            <p className="font-medium text-sm">Daily Summary</p>
                            <p className="text-xs text-muted-foreground">End-of-day report on your progress</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="time"
                            value={globalSettings.dailySummaryTime}
                            onChange={(e) => updateGlobalSettings({ dailySummaryTime: e.target.value })}
                            className="bg-transparent border-b border-border w-[60px] text-xs focus:outline-none"
                        />
                        <button
                            onClick={() => toggleGlobal('dailySummary')}
                            className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.dailySummary ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
                        >
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                    </div>
                </div>

                {/* Plan Reminders Toggle */}
                <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-green-500" />
                        <div>
                            <p className="font-medium text-sm">Plan Task Reminders</p>
                            <p className="text-xs text-muted-foreground">Notify at assigned task times</p>
                        </div>
                    </div>
                    <button
                        onClick={() => toggleGlobal('planReminders')}
                        className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${globalSettings.enabledAlerts.planReminders ? 'bg-primary justify-end' : 'bg-muted justify-start'}`}
                    >
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
}
