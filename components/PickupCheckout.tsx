import React from 'react';
import { CartItem } from '../types';

interface PickupCheckoutProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
}

export const PickupCheckout: React.FC<PickupCheckoutProps> = ({ isOpen, onClose, items }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">

                <div className="p-8 md:p-12 text-center border-b border-white/5 bg-[#1a1a1a]">
                    <div className="w-20 h-20 bg-[#39FF14] text-black rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-[0_0_20px_#39FF14]">
                        📍
                    </div>
                    <h2 className="text-4xl md:text-5xl heading-font mb-2 text-white">Pickup Point</h2>
                    <p className="body-font text-gray-400 text-lg">
                        Your stash is reserved. Head to the club to pay and pickup.
                    </p>
                </div>

                <div className="p-8 md:p-12 space-y-8">

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#39FF14]">Location</h3>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                            <div className="text-3xl">🏢</div>
                            <div>
                                <h4 className="text-xl font-bold uppercase mb-1">CannaCrazy Social Club</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    123 High Street, Downtown District<br />
                                    New York, NY 10012
                                </p>
                                <div className="mt-4 flex gap-4 text-sm font-bold text-[#39FF14]">
                                    <span>Open Daily: 10AM - 10PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Your Reservation</h3>
                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 max-h-40 overflow-y-auto custom-scrollbar">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center py-2 text-sm border-b border-white/5 last:border-0">
                                    <span className="font-bold text-gray-300">{item.title}</span>
                                    <span className="font-mono text-[#39FF14]">x{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-5 bg-[#39FF14] text-black font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                    >
                        Got It, On My Way
                    </button>

                </div>
            </div>
        </div>
    );
};
