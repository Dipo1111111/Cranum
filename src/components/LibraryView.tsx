import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, X, ChevronRight } from 'lucide-react';
import { useHabitContext } from '@/context/HabitContext';
import { CranumHabit } from '@/types/habit';

export function LibraryView() {
    const { lifestyleArticles } = useHabitContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<CranumHabit | null>(null);

    const filteredArticles = lifestyleArticles.filter(art =>
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.mechanism.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Cranum Library</h2>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Deep dives into mechanisms, lifestyle principles, and bone-remodeling science.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                    type="text"
                    placeholder="Search principles, mechanisms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-transparent focus:border-primary/30 rounded-2xl text-sm outline-none transition-all"
                />
            </div>

            <div className="space-y-3">
                {filteredArticles.map((article) => (
                    <button
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="w-full flex items-center justify-between p-5 bg-card border border-border/50 rounded-[2rem] hover:border-primary/30 transition-all text-left group"
                    >
                        <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 mb-1 block">
                                {article.mechanism}
                            </span>
                            <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                                {article.name}
                            </h3>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </button>
                ))}
            </div>

            {/* Article Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background flex flex-col"
                    >
                        <header className="h-16 flex items-center justify-between px-6 border-b border-border/50">
                            <button onClick={() => setSelectedArticle(null)} className="p-2 -ml-2 rounded-full hover:bg-secondary">
                                <X size={20} />
                            </button>
                            <h2 className="text-sm font-black uppercase tracking-widest">Article</h2>
                            <div className="w-10" /> {/* Spacer */}
                        </header>

                        <main className="flex-1 overflow-y-auto p-8 space-y-6 max-w-2xl mx-auto w-full">
                            <div className="space-y-2">
                                <span className="text-xs font-black text-primary uppercase tracking-widest leading-none">
                                    {selectedArticle.mechanism}
                                </span>
                                <h1 className="text-3xl font-black tracking-tight leading-tight">
                                    {selectedArticle.name}
                                </h1>
                            </div>

                            <div className="prose prose-sm prose-invert max-w-none">
                                {selectedArticle.article?.split('\n').map((line, i) => {
                                    if (line.startsWith('# ')) return <h2 key={i} className="text-xl font-black mt-8 mb-4">{line.replace('# ', '')}</h2>;
                                    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>;
                                    if (line.startsWith('**')) return <p key={i} className="text-muted-foreground leading-relaxed mb-4"><strong>{line.replace(/\*\*/g, '')}</strong></p>;
                                    return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{line}</p>;
                                })}
                            </div>
                        </main>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
