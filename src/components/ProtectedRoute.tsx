import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                    <Zap className="w-8 h-8 text-primary fill-primary" />
                </motion.div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
}
