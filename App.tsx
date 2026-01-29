import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Budtender } from './components/StrainPicker';
import { Cart } from './components/Cart';
import { ProductScroll } from './components/ProductScroll';
import { ProductModal } from './components/ProductModal';
import { JoinFormModal } from './components/JoinFormModal';
import { FAQSection } from './components/FAQSection';
import { PickupCheckout } from './components/PickupCheckout';
import { Product, CartItem } from './types';
import flowerImg from './Images/Flower.jpeg';
// Import Data
import { FLOWERS, PREROLLS, EDIBLES, CBD } from './data/products';


const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // New State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isPickupOpen, setIsPickupOpen] = useState(false);

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
        onCheckout={() => setIsPickupOpen(true)}
      />

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <JoinFormModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      <PickupCheckout
        isOpen={isPickupOpen}
        onClose={() => setIsPickupOpen(false)}
        items={cartItems}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="text-3xl heading-font text-[#39FF14] tracking-tighter">CannaCrazy</div>
        <div className="hidden md:flex gap-8 body-font uppercase font-bold text-sm tracking-widest">
          <a href="#about" className="hover:neon-text-green transition-all">About</a>
          <a href="#budtender" className="hover:neon-text-purple transition-all">Budtender</a>
          <a href="#shop" className="hover:neon-text-yellow transition-all">Shop</a>
          <a href="#specialty" className="hover:neon-text-blue transition-all">Specialty</a>
          <a href="#faq" className="hover:text-white transition-all">FAQ</a>
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
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="hidden sm:block px-6 py-2 bg-[#39FF14] text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          >
            JOIN THE FAM
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="max-w-6xl">
          <h1 className="text-7xl md:text-9xl mb-6 leading-tight">
            ELEVATE YOUR <span className="text-[#39FF14]">HIGH</span> &<br /> GO KINDA CRAZY
          </h1>
          <p className="text-xl md:text-3xl body-font max-w-3xl mx-auto mb-12 opacity-80 leading-relaxed">
            Welcome to the CannaCrazy Social Club. A curated sanctuary where premium genetics meet authentic connection.
            We're a tight-knit collective open to all who vibe—come for the stash, stay for the family.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#budtender" className="px-12 py-6 bg-[#BC13FE] text-white text-2xl font-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(57,255,20,0.5)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 transition-all uppercase tracking-tighter hover:rotate-1">
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
        <div className="max-w-[1920px] mx-auto space-y-32">

          {/* FLOWER / BUD */}
          <div>
            <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-white">FLOWER / BUD</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ TOP SHELF ]</div>
            </div>
            <ProductScroll
              items={FLOWERS}
              onProductClick={setSelectedProduct}
            />
          </div>

          {/* PRE-ROLLS */}
          <div>
            <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-[#39FF14]">PRE-ROLLS</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ READY TO SPARK ]</div>
            </div>
            <ProductScroll
              items={PREROLLS}
              onProductClick={setSelectedProduct}
              color="#39FF14"
            />
          </div>

          {/* EDIBLES */}
          <div className="relative">
            <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-[#FBFF00]">EDIBLES</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ BOLD FLAVORS ]</div>
            </div>
            <ProductScroll
              items={EDIBLES}
              onProductClick={setSelectedProduct}
              color="#FBFF00"
            />
          </div>

          {/* CBD SECTION */}
          <div>
            <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
              <h2 className="text-6xl md:text-8xl text-white">CBD & WELLNESS</h2>
              <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ RELAX & RESTORE ]</div>
            </div>
            <ProductScroll
              items={CBD}
              onProductClick={setSelectedProduct}
              color="#FFF"
            />
          </div>

          {/* Specialty */}
          <div id="specialty" className="max-w-7xl mx-auto">
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
                    onClick={() => handleAddToCart({
                      id: 'vault-1', title: 'The Vault Box', color: '#00D2FF', image: flowerImg,
                      description: "The ultimate collector's item.",
                      category: 'merch', strength: 'Nuclear', growType: 'Indoor'
                    })}
                    className="px-12 py-5 bg-[#00D2FF] text-black text-2xl font-black rounded-2xl hover:scale-105 transition-all"
                  >
                    ADD TO RESERVATION
                  </button>
                </div>
                <div className="flex-1 relative z-10">
                  <img src={flowerImg} className="rounded-3xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700" alt="Vault" />
                </div>
                <div className="absolute top-0 right-0 p-10 text-[15rem] heading-font opacity-5 select-none leading-none">RARE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Social Proof */}
      <section id="fam" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl mb-16 text-center">CANNA FAM VIBES</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-[#111] p-4 rounded-[2rem] border-2 border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group">
                <img src={`https://picsum.photos/400/400?random=${i + 10}`} className="rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all" alt="User" />
                <p className="body-font italic text-gray-400 mb-2">"The budtender recommended exactly what I needed. Truly the goat."</p>
                <div className="heading-font text-[#39FF14]">@CRAZY_USER_{i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 flex flex-col items-center justify-center text-center bg-[#39FF14] text-black">
        <h2 className="text-6xl md:text-9xl mb-8 leading-none">DON'T BE A <br /><span className="bg-black text-[#39FF14] px-4">STRANGER</span></h2>
        <p className="text-2xl body-font max-w-2xl mb-12 font-bold uppercase">
          JOIN 50,000+ CANNACRAZY MEMBERS GETTING EXCLUSIVE DEALS EVERY MONTH.
        </p>
        <button
          onClick={() => setIsJoinModalOpen(true)}
          className="px-10 py-5 bg-black text-white font-black text-xl rounded-2xl shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:scale-105 active:scale-95 transition-all"
        >
          ENLIST
        </button>
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
