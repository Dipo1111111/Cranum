import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Target, BarChart3, ArrowRight, Shield, Sparkles, Brain } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            {/* Decorative Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-foreground/5 blur-[100px]" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Cranum</span>
                    </div>
                    <button
                        onClick={() => navigate('/auth')}
                        className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Launch App
                        <ArrowRight size={14} />
                    </button>
                </div>
            </nav>

            <main className="relative z-10 pt-20">
                {/* Hero Section */}
                <section className="px-6 py-20 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                            <Sparkles size={14} />
                            The Science of Facial Ascension
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                            Sculpt Your <br />
                            <span className="text-primary italic">Absolute Potential</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                            Cranum is a premium, data-driven system for facial and physical development.
                            Track 25 science-backed habits across 5 core goals.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <button
                                onClick={() => navigate('/auth')}
                                className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                            >
                                Start Your Ascension
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-20 bg-secondary/30 border-y border-border/40">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="premium-card p-8 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Brain size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Smart Scheduling</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                    Our engine intelligently distributes 25 habits across your week to prevent burn out while maximizing result speed.
                                </p>
                            </div>

                            <div className="premium-card p-8 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Shield size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Elite Database</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                    Every habit includes detailed mechanics, dos, don'ts, and triggers based on cranial and fascial research.
                                </p>
                            </div>

                            <div className="premium-card p-8 space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <BarChart3 size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Ascension Tracking</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                                    Visualize your growth with advanced metrics, streaks, and a 70% threshold designed for long-term physiological changes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="px-6 py-32 text-center">
                    <div className="max-w-4xl mx-auto premium-card p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Ascend?</h2>
                        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto font-light">
                            Join the elite tier of disciplined individuals building their ideal identity.
                        </p>
                        <button
                            onClick={() => navigate('/auth')}
                            className="px-12 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl hover:scale-105 transition-all active:scale-95"
                        >
                            Get Started Now
                        </button>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/40 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary fill-current" />
                        <span className="font-bold text-lg">Cranum</span>
                    </div>
                    <p className="text-muted-foreground text-sm">© 2024 Cranum. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
