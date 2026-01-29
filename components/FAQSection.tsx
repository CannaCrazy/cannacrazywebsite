import React, { useState } from 'react';

const FAQS = [
    {
        q: "How do I become a member?",
        a: "Membership is open to all cannabis enthusiasts over 21. Just sign up online or visit us in-store to join the fam. We verify ID at the door, every time."
    },
    {
        q: "Is the lounge open to the public?",
        a: "Yes, our social lounge is open daily from 10am to 10pm. However, during member-only events (usually Friday nights), access is restricted to Gold card holders."
    },
    {
        q: "Do you deliver?",
        a: "Currently, we operate on a pre-order and pickup model. You can reserve your stash online and grab it at our express counter. Delivery coming late 2026."
    },
    {
        q: "What payment methods do you accept?",
        a: "Cash is king. We also accept debit cards with a PIN for a small convenience fee. We are working on crypto payments."
    },
    {
        q: "Are the genetics really exclusive?",
        a: "100%. We work directly with small-batch craft growers. Many of the strains you see here are grown specifically for CannaCrazy and can't be found anywhere else."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-end gap-6 mb-16">
                    <h2 className="text-6xl md:text-8xl text-white heading-font">FAQ</h2>
                    <div className="mb-4 text-[#39FF14] font-bold uppercase tracking-widest hidden md:block animate-pulse">
                        [ KNOWLEDGE BASE ]
                    </div>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-white/10 rounded-2xl overflow-hidden bg-[#111] transition-all duration-300 hover:border-white/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full text-left p-6 md:p-8 flex items-center justify-between group"
                            >
                                <span className="text-xl md:text-2xl font-bold uppercase tracking-wide group-hover:text-[#39FF14] transition-colors">
                                    {faq.q}
                                </span>
                                <span className={`text-2xl transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-[#39FF14]' : 'text-gray-500'}`}>
                                    +
                                </span>
                            </button>

                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-6 md:p-8 pt-0 body-font text-gray-400 text-lg leading-relaxed border-t border-white/5">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
