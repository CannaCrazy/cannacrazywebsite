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

const FACTS = [
    "Did you know eating mango 45 minutes before smoking can intensify and extend your high? The myrcene does the magic! 🥭",
    "The term '420' came from a group of California high school high schoolers who met at 4:20pm to search for an abandoned cannabis crop.",
    "Chocolate and weed both release anandamide in your brain—the 'bliss molecule'. Together? Next level vibes. 🍫",
    "Shakespeare's pipes contained traces of cannabis. The Bard was definitely elevated when he wrote those sonnets.",
    "Bhutan was the last country to ban cannabis... in 2004. Before that, it was literally just pig food."
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end gap-6 mb-16">
                    <h2 className="text-6xl md:text-8xl text-white heading-font">FAQ & FACTS</h2>
                    <div className="mb-4 text-[#39FF14] font-bold uppercase tracking-widest hidden md:block animate-pulse">
                        [ KNOWLEDGE BASE ]
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        <h3 className="text-2xl heading-font mb-6 text-[#BC13FE]">Common Questions</h3>
                        {FAQS.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl overflow-hidden bg-[#111] transition-all duration-300 hover:border-white/30"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full text-left p-6 flex items-center justify-between group"
                                >
                                    <span className="text-lg font-bold uppercase tracking-wide group-hover:text-[#39FF14] transition-colors">
                                        {faq.q}
                                    </span>
                                    <span className={`text-xl transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-[#39FF14]' : 'text-gray-500'}`}>
                                        +
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 body-font text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fun Facts */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-10 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl">💡</div>
                        <h3 className="text-2xl heading-font mb-8 text-[#FBFF00]">Did You Know?</h3>
                        <div className="space-y-6">
                            {FACTS.map((fact, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <span className="text-[#39FF14] font-bold text-lg">0{i + 1}.</span>
                                    <p className="body-font text-gray-300 leading-relaxed">{fact}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
