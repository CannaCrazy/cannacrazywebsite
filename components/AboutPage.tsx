import React from 'react';

export const AboutPage: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen text-center animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-8xl mb-8 heading-font neon-text-green">
                    BEYOND THE BUD
                </h1>
                <p className="text-xl md:text-2xl body-font text-gray-400 mb-20 leading-relaxed max-w-3xl mx-auto">
                    We aren't just a social club. We are pioneers in the cannabis space, helping others elevate their business to new highs.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">

                    <div className="p-10 rounded-[3rem] bg-[#1a1a1a] border border-white/10 hover:border-[#39FF14] transition-all group">
                        <div className="text-5xl mb-6">🚀</div>
                        <h2 className="text-3xl heading-font mb-4 group-hover:neon-text-green transition-all">Cannabis Consulting</h2>
                        <p className="body-font text-gray-400 leading-relaxed mb-6">
                            Starting a club or dispensary? Our veteran team offers end-to-end consulting. From compliance and licensing to interior design and strain sourcing, we've done it all.
                        </p>
                        <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-[#39FF14] hover:text-black hover:border-transparent transition-all uppercase text-sm font-bold">
                            Inquire Now
                        </button>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-[#1a1a1a] border border-white/10 hover:border-[#BC13FE] transition-all group">
                        <div className="text-5xl mb-6">⚡</div>
                        <h2 className="text-3xl heading-font mb-4 group-hover:neon-text-purple transition-all">Marketing Squad</h2>
                        <p className="body-font text-gray-400 leading-relaxed mb-6">
                            Our in-house creative agency knows how to market in a restricted industry. We offer brand identity, social media management, and content creation services for your brand.
                        </p>
                        <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-[#BC13FE] hover:text-white hover:border-transparent transition-all uppercase text-sm font-bold">
                            Hire The Squad
                        </button>
                    </div>

                    <div className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/10 hover:border-[#FBFF00] transition-all group flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <div className="text-5xl mb-6">💻</div>
                            <h2 className="text-3xl heading-font mb-4 group-hover:neon-text-yellow transition-all">Custom POS Systems</h2>
                            <p className="body-font text-gray-400 leading-relaxed mb-8">
                                Run your club smoothly with our proprietary Point of Sale software. Designed specifically for social clubs, it handles membership tracking, inventory, and "reservation" style checkouts seamlessly. Available for rent or white-label licensing.
                            </p>
                            <button className="px-8 py-3 rounded-full bg-[#FBFF00] text-black font-black uppercase text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(251,255,0,0.3)]">
                                Request Demo
                            </button>
                        </div>
                        <div className="flex-1 w-full bg-black/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                            <div className="relative z-10 space-y-3 font-mono text-xs text-[#39FF14]">
                                <div>&gt; System.init(CannaOS)</div>
                                <div>&gt; Loading Modules...</div>
                                <div className="text-[#FBFF00]">&gt; Inventory: SYNCED</div>
                                <div className="text-[#BC13FE]">&gt; Members: ONLINE</div>
                                <div className="animate-pulse">&gt; Ready for transaction_</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-32">
                    <h3 className="text-2xl heading-font mb-8">Trusted Partners</h3>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="text-2xl font-black">HERB & CO</div>
                        <div className="text-2xl font-black">GREENWAVE</div>
                        <div className="text-2xl font-black">HIGHLIFE</div>
                        <div className="text-2xl font-black">ROOTS</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
