import { useState, useEffect, useCallback } from 'react';

type Mode = 'light' | 'dark';
const MODE_KEY = 'fastview_mode';

export function useTheme() {
    const [mode, setMode] = useState<Mode>(() => {
        return (localStorage.getItem(MODE_KEY) as Mode) || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem(MODE_KEY, mode);
    }, [mode]);

    const toggleMode = useCallback(() => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    }, []);

    return {
        mode,
        toggleMode,
        isDark: mode === 'dark'
    };
}
