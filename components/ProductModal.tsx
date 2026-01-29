import React from 'react';
import { Product } from '../types';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-4xl bg-[#111] rounded-[3rem] border-2 border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(57,255,20,0.2)] animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-white/20 rounded-full flex items-center justify-center text-2xl transition-all"
                >
                    ✕
                </button>

                {/* Image Side */}
                <div className="md:w-1/2 relative bg-[#0a0a0a] min-h-[300px] md:min-h-[500px]">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />

                    {/* Badge */}
                    {product.category && (
                        <div className="absolute top-6 left-6 px-4 py-2 bg-[#39FF14] text-black font-black uppercase tracking-widest rounded-lg transform -rotate-2">
                            {product.category}
                        </div>
                    )}
                </div>

                {/* Content Side */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative">
                    <h2
                        className="text-4xl md:text-6xl mb-2 leading-none uppercase heading-font"
                        style={{ color: product.color || '#fff' }}
                    >
                        {product.title}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {product.growType && (
                            <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-gray-400">
                                🌱 {product.growType}
                            </span>
                        )}
                        {product.potency && (
                            <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-gray-400">
                                ⚡ {product.potency}
                            </span>
                        )}
                        {product.strength && (
                            <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-gray-400">
                                💪 {product.strength}
                            </span>
                        )}
                    </div>

                    <p className="body-font text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                        {product.description || "A premium selection from the CannaCrazy vault. This strain is curated for those who appreciate the finer details of cannabis culture."}
                    </p>

                    {product.effects && (
                        <div className="mb-8">
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">Effects</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.effects.map(effect => (
                                    <span key={effect} className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-[#39FF14]">
                                        {effect}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-auto pt-8 border-t border-white/10">
                        <button
                            onClick={() => {
                                onAddToCart(product);
                                onClose();
                            }}
                            className="w-full py-5 bg-[#39FF14] text-black font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.4)]"
                        >
                            Add to Reservation
                        </button>
                        <p className="text-center mt-4 text-xs text-gray-500 uppercase tracking-widest">
                            Pay upon pickup at the club
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
