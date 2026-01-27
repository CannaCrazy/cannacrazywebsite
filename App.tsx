
import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Budtender } from './components/StrainPicker';
import { Cart } from './components/Cart';
import { Product, CartItem } from './types';

const ProductCard: React.FC<{ 
  product: Product; 
  onAddToCart: (p: Product) => void;
}> = ({ product, onAddToCart }) => (
  <div className="bg-[#111] p-6 rounded-[2.5rem] border-2 border-white/10 hover:scale-[1.02] transition-all group overflow-hidden">
    <div className="relative mb-6">
      <img src={product.image} className="w-full h-64 object-cover rounded-2xl group-hover:rotate-2 transition-transform duration-500" alt={product.title} />
      <div className={`absolute top-4 right-4 px-4 py-1 rounded-full font-bold text-black`} style={{ backgroundColor: product.color }}>
        ${product.price}
      </div>
    </div>
    <h3 className="text-3xl mb-4 group-hover:neon-text-green transition-all">{product.title}</h3>
    <button 
      onClick={() => onAddToCart(product)}
      className="w-full py-4 rounded-xl font-bold bg-white/5 hover:bg-white text-white hover:text-black transition-all uppercase tracking-widest text-sm border border-white/10 active:scale-95"
    >
      Grab It
    </button>
  </div>
);

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cannacrazy_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('cannacrazy_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative z-10 min-h-screen text-white">
      <BackgroundEffects />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="text-3xl heading-font text-[#39FF14] tracking-tighter">CannaCrazy</div>
        <div className="hidden md:flex gap-8 body-font uppercase font-bold text-sm tracking-widest">
          <a href="#about" className="hover:neon-text-green transition-all">About</a>
          <a href="#budtender" className="hover:neon-text-purple transition-all">Budtender</a>
          <a href="#shop" className="hover:neon-text-yellow transition-all">Shop</a>
          <a href="#specialty" className="hover:neon-text-blue transition-all">Specialty</a>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 group"
          >
            <span className="text-3xl group-hover:neon-text-green transition-all">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#BC13FE] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden sm:block px-6 py-2 bg-[#39FF14] text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            JOIN THE FAM
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="max-w-5xl">
          <h1 className="text-7xl md:text-9xl mb-6 leading-tight">
            ELEVATE YOUR <span className="text-[#39FF14]">HIGH</span> & JOIN THE FAM
          </h1>
          <p className="text-xl md:text-3xl body-font max-w-3xl mx-auto mb-12 opacity-80 leading-relaxed">
            The world's first streetwear-inspired cannabis ecosystem. 
            No more guessing. Just perfect vibes, suggested by our Digital Budtender.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#budtender" className="px-12 py-6 bg-[#BC13FE] text-white text-2xl font-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              ASK THE BUDTENDER
            </a>
            <div className="text-sm font-bold uppercase tracking-widest flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#39FF14]"></span>
              Trusted by 10k+ Stoners
              <span className="w-12 h-[2px] bg-[#39FF14]"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="about" className="py-32 px-6 bg-white text-black rounded-[5rem] mx-4 md:mx-10 relative z-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#39FF14] rounded-3xl flex items-center justify-center transform rotate-3 group-hover:rotate-12 transition-transform">
              <span className="text-4xl text-black">🍀</span>
            </div>
            <h2 className="text-4xl">Expert Selection</h2>
            <p className="body-font text-lg leading-relaxed">
              We don't just sell weed. We know exactly what you'll love based on your unique vibe and flavor preferences. Our Digital Budtender knows the genetics inside out.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#BC13FE] rounded-3xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-4xl text-white">🎨</span>
            </div>
            <h2 className="text-4xl">Streetwear Soul</h2>
            <p className="body-font text-lg leading-relaxed">
              Cannabis culture is streetwear culture. From our packaging to our digital experience, we bring that gritty, vibrant graffiti aesthetic to every interaction.
            </p>
          </div>
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#FBFF00] rounded-3xl flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform">
              <span className="text-4xl text-black">💎</span>
            </div>
            <h2 className="text-4xl">Exclusive Drops</h2>
            <p className="body-font text-lg leading-relaxed">
              Be part of the Inner Circle. Monthly member-only giveaways, surprise drops, and priority access to limited edition genetic crosses.
            </p>
          </div>
        </div>
      </section>

      {/* Budtender Section */}
      <section id="budtender" className="py-40 px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl neon-text-purple mb-4">THE BUDTENDER</h2>
          <p className="text-xl body-font max-w-2xl mx-auto opacity-70">
            Tell the budtender how you want to feel, and we'll reveal your perfect botanical match from our secret stash.
          </p>
        </div>
        <Budtender onAddToCart={handleAddToCart} />
      </section>

      {/* Shop Sections */}
      <section id="shop" className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* PRE-ROLLS */}
          <div>
            <div className="flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-[#39FF14]">PRE-ROLLS</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ READY TO SPARK ]</div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'pr-1', title: "Graffiti Glaze", price: 15, color: "#39FF14", image: "https://images.unsplash.com/photo-1619374092790-a7b32d164f9b?auto=format&fit=crop&q=80&w=800" }} 
              />
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'pr-2', title: "Neon Nightcap", price: 12, color: "#BC13FE", image: "https://images.unsplash.com/photo-1596272782704-58580629a888?auto=format&fit=crop&q=80&w=800" }} 
              />
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'pr-3', title: "Street Haze", price: 18, color: "#FBFF00", image: "https://images.unsplash.com/photo-1628103130182-3e284a14896d?auto=format&fit=crop&q=80&w=800" }} 
              />
            </div>
          </div>

          {/* EDIBLES */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 text-[10rem] opacity-5 pointer-events-none select-none heading-font text-[#FBFF00]">CANDY</div>
            <div className="flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-[#FBFF00]">EDIBLES</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ BOLD FLAVORS ]</div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'ed-1', title: "Static Gummies", price: 25, color: "#FBFF00", image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=800" }} 
              />
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'ed-2', title: "Chaos Crunch", price: 30, color: "#FF8C00", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800" }} 
              />
              <ProductCard 
                onAddToCart={handleAddToCart}
                product={{ id: 'ed-3', title: "Hyper Chews", price: 22, color: "#39FF14", image: "https://images.unsplash.com/photo-1582050041567-9cfdd33e3b86?auto=format&fit=crop&q=80&w=800" }} 
              />
            </div>
          </div>

          {/* Specialty */}
          <div id="specialty">
            <div className="flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-[#00D2FF]">SPECIALTY</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ RARE FINDS ]</div>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
              <div className="bg-[#1a1a1a] rounded-[3rem] p-12 border-4 border-[#00D2FF] flex flex-col md:flex-row gap-12 items-center relative overflow-hidden group">
                <div className="flex-1 space-y-6 relative z-10">
                   <div className="inline-block px-4 py-1 bg-[#00D2FF] text-black font-bold rounded-full">LIMITED DROP</div>
                   <h3 className="text-5xl md:text-7xl group-hover:neon-text-blue transition-all">THE VAULT BOX</h3>
                   <p className="text-xl body-font text-gray-400">Our signature collection featuring 1oz of rare genetics, limited edition streetwear, and a signed piece of digital art.</p>
                   <button 
                    onClick={() => handleAddToCart({ id: 'vault-1', title: 'The Vault Box', price: 250, color: '#00D2FF', image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800' })}
                    className="px-12 py-5 bg-[#00D2FF] text-black text-2xl font-black rounded-2xl hover:scale-105 transition-all"
                   >
                     ADD TO CART
                   </button>
                </div>
                <div className="flex-1 relative z-10">
                  <img src="https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700" alt="Vault" />
                </div>
                <div className="absolute top-0 right-0 p-10 text-[15rem] heading-font opacity-5 select-none leading-none">RARE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="fam" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl mb-16 text-center">CANNA FAM VIBES</h2>
          <div className="grid md:grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="bg-[#111] p-4 rounded-[2rem] border-2 border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group">
                 <img src={`https://picsum.photos/400/400?random=${i+10}`} className="rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all" alt="User" />
                 <p className="body-font italic text-gray-400 mb-2">"The budtender recommended exactly what I needed. Truly the goat."</p>
                 <div className="heading-font text-[#39FF14]">@CRAZY_USER_{i}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 flex flex-col items-center justify-center text-center bg-[#39FF14] text-black">
        <h2 className="text-6xl md:text-9xl mb-8 leading-none">DON'T BE A <br/><span className="bg-black text-[#39FF14] px-4">STRANGER</span></h2>
        <p className="text-2xl body-font max-w-2xl mb-12 font-bold uppercase">
          JOIN 50,000+ CANNACRAZY MEMBERS GETTING EXCLUSIVE DEALS EVERY MONTH.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <input 
            type="email" 
            placeholder="YOUR EMAIL" 
            className="flex-1 px-8 py-5 bg-white border-4 border-black text-black font-bold placeholder-black/50 outline-none rounded-2xl" 
          />
          <button className="px-10 py-5 bg-black text-white font-black text-xl rounded-2xl shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:scale-105 active:scale-95 transition-all">
            ENLIST
          </button>
        </div>
        <p className="mt-8 text-sm opacity-60 font-bold tracking-widest uppercase">
          *Must be 21+. Enjoy responsibly.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10 text-center body-font text-xs uppercase tracking-widest text-gray-500">
        © 2025 CANNACRAZY CO. • BORN IN THE STREETS • THE DIGITAL BUDTENDER • ALL RIGHTS RESERVED
      </footer>

      {/* Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-[90] md:hidden">
        <button 
          onClick={() => {
            const shopSection = document.getElementById('shop');
            shopSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full py-5 bg-[#39FF14] text-black font-black text-xl rounded-2xl shadow-2xl border-2 border-black"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default App;
