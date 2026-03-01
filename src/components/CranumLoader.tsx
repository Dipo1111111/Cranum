import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function CranumLoader() {
    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6">
            {/* Background radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center gap-8">
                {/* Animated Icon Container */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="relative"
                >
                    <div className="w-20 h-20 rounded-[2.5rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/20">
                        <Zap className="w-10 h-10 text-primary-foreground fill-current animate-pulse" />
                    </div>

                    {/* Circular progress orbit */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 border-t-2 border-r-2 border-primary/20 rounded-full"
                    />
                </motion.div>

                {/* Text Area */}
                <div className="text-center space-y-3">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-2xl font-black tracking-tighter uppercase"
                    >
                        Cranum
                    </motion.h2>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col items-center gap-1"
                    >
                        <span className="text-[10px] font-black tracking-[0.3em] text-primary/40 uppercase">
                            Initializing Engine
                        </span>
                        <div className="w-32 h-0.5 bg-secondary overflow-hidden rounded-full mt-2">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-full h-full bg-primary"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Aesthetic branding footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-1"
            >
                <span className="text-[9px] font-bold text-muted-foreground/40 tracking-widest uppercase">
                    Consistency Over Perfection
                </span>
            </motion.div>
        </div>
    );
}
