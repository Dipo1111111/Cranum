import { HelpCircle } from 'lucide-react';
import { resetGuide } from '@/components/onboarding/OnboardingGuide';

export function HelpSupportMenu() {
    return (
        <div className="space-y-4">
            <div className="card-elevated">
                <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Help & Support</h3>

                <button
                    onClick={resetGuide}
                    className="btn-secondary w-full flex items-center justify-center gap-2 py-3 mb-4"
                >
                    <HelpCircle size={18} />
                    Show Guided Tour
                </button>

                <h3 className="text-lg font-semibold text-foreground mb-2 mt-6 font-heading">About</h3>
                <p className="text-sm text-muted-foreground">
                    AtomicXP helps you build better habits through gamification.
                    Complete habits to earn XP and track your progress over time.
                </p>
                <p className="text-xs text-muted-foreground/60 mt-4">
                    Data is stored locally on your device.
                </p>
            </div>
        </div>
    );
}
