import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }) => {

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l-4 border-[#39FF14] z-[101] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-[-20px_0_50px_rgba(57,255,20,0.2)]`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-4xl heading-font neon-text-green">Your Reservation</h2>
          <button onClick={onClose} className="text-white hover:text-[#39FF14] transition-colors text-2xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-6xl grayscale">🍃</span>
              <p className="text-xl body-font text-gray-400">Your reservation list is empty, fam.</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#39FF14] text-black font-black rounded-xl uppercase"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 group">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl border border-white/20" />
                <div className="flex-1">
                  <h3 className="heading-font text-lg leading-tight mb-1 group-hover:text-[#39FF14] transition-colors">{item.title}</h3>
                  {item.variant && <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{item.variant}</p>}

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center bg-black rounded-lg border border-white/10">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 hover:text-[#39FF14]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 hover:text-[#39FF14]"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-red-500 hover:underline uppercase font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-[#111] border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-5 bg-[#BC13FE] text-white font-black text-2xl rounded-2xl shadow-[4px_4px_0px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase"
            >
              Confirm Reservation
            </button>
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
              No payment required online • 21+ ID Required at Pickup
            </p>
          </div>
        )}
      </div>
    </>
  );
};
