import { useRegisterSW } from 'virtual:pwa-register/react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export function ReloadPrompt() {
    const { toast } = useToast();
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    useEffect(() => {
        if (needRefresh) {
            toast({
                title: "New content available",
                description: "Click reload to update the app.",
                action: (
                    <ToastAction altText="Reload" onClick={() => updateServiceWorker(true)}>
                        Reload
                    </ToastAction>
                ),
                duration: Infinity, // Keep open until action taken
            });
        }
    }, [needRefresh, toast, updateServiceWorker]);

    return null;
}
