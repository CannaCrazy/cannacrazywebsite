import React, { useRef } from 'react';
import { Product } from '../types';

interface ProductScrollProps {
    items: Product[];
    onProductClick: (product: Product) => void;
    color?: string;
}

export const ProductScroll: React.FC<ProductScrollProps> = ({ items, onProductClick, color = '#39FF14' }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative group">
            {/* Scroll Controls Hint - visible on hover */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-12 px-6 snap-x snap-mandatory scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                {items.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className="flex-none w-[280px] md:w-[350px] snap-center cursor-pointer group/card"
                    >
                        <div className="relative h-[400px] bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/20 hover:-translate-y-2">
                            {/* Image */}
                            <div className="h-2/3 relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 group-hover/card:rotate-2"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <span className="px-6 py-2 border-2 border-white text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="h-1/3 p-6 flex flex-col justify-between bg-gradient-to-b from-[#1a1a1a] to-[#111]">
                                <div>
                                    <h3 className="text-2xl font-bold uppercase mb-2 leading-none" style={{ color: product.color || '#fff' }}>
                                        {product.title}
                                    </h3>
                                    <div className="flex gap-2 text-xs text-gray-400 font-mono">
                                        {product.growType && <span>{product.growType}</span>}
                                        {product.strength && <span>• {product.strength}</span>}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-gray-500 group-hover/card:bg-[#39FF14] group-hover/card:text-black group-hover/card:border-transparent transition-all">
                                        ➜
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Spacer for end of scroll */}
                <div className="flex-none w-10" />
            </div>
        </div>
    );
};
