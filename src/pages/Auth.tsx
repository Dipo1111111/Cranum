import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, Brain, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNotifications } from '../hooks/useNotifications';

export default function Auth() {
    const { user, loading, signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            navigate('/app', { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading || user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <Zap className="w-8 h-8 text-primary fill-primary" />
                </motion.div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            if (mode === 'login') {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
                setError("Verification email sent! Check your inbox.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSignUp = mode === 'signup';

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="premium-card p-8">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">Cranum</span>
                    </div>

                    <div className="space-y-2 mb-8 text-center" id="auth-header">
                        <h1 className="text-3xl font-black tracking-tighter">
                            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-muted-foreground text-sm font-light">
                            {isSignUp
                                ? 'Join the elite tier of disciplined individuals.'
                                : 'Continue your ascension journey.'}
                        </p>
                    </div>

                    <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-8">
                        {(['login', 'signup'] as const).map((m) => (
                            <button key={m} onClick={() => { setMode(m); setError(null); }}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === m ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                                {m === 'login' ? 'Log In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" id="auth-form">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input id="email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@domain.com"
                                    className="w-full pl-11 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input id="password-input" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                <button type="button" onClick={() => setShowPassword(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <p className="text-[11px] leading-relaxed text-muted-foreground font-light mb-4">
                            Cranum uses a 70% threshold system. Consistency over perfection is the key to
                            physiological change.
                        </p>

                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                    className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
                                    <AlertCircle className="w-4 h-4 mt-0.5" />{error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button id="auth-submit" type="submit" disabled={isSubmitting}
                            className="w-full py-4 bg-primary text-primary-foreground font-black rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20">
                            {isSubmitting ? 'Processing...' : (mode === 'login' ? 'Ascend' : 'Create Account')}
                            {!isSubmitting && <ArrowRight size={18} />}
                        </button>
                    </form>
                </motion.div>

                <div className="text-center mt-8">
                    <a href="/" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">← Back to Site</a>
                </div>
            </div>
        </div>
    );
}
