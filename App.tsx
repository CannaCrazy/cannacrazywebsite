import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Budtender } from './components/StrainPicker';
import { Cart } from './components/Cart';
import { ProductScroll } from './components/ProductScroll';
import { ProductModal } from './components/ProductModal';
import { JoinFormModal } from './components/JoinFormModal';
import { FAQSection } from './components/FAQSection';
import { PickupCheckout } from './components/PickupCheckout';
import { AboutPage } from './components/AboutPage';
import { Product, CartItem } from './types';
import flowerImg from './Images/Flower.jpeg';
// Import Data
import { FLOWERS_GREENHOUSE, FLOWERS_A, FLOWERS_AA, FLOWERS_AAA, PREROLLS, EDIBLES, CBD } from './data/products';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
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
        <div
          onClick={() => setCurrentView('home')}
          className="text-3xl heading-font text-[#39FF14] tracking-tighter cursor-pointer"
        >
          CannaCrazy
        </div>
        <div className="hidden md:flex gap-8 body-font uppercase font-bold text-sm tracking-widest">
          <button onClick={() => setCurrentView('home')} className={`hover:neon-text-green transition-all ${currentView === 'home' ? 'text-[#39FF14]' : ''}`}>Home</button>
          <button onClick={() => setCurrentView('about')} className={`hover:neon-text-purple transition-all ${currentView === 'about' ? 'text-[#BC13FE]' : ''}`}>About Us</button>
          {currentView === 'home' && (
            <>
              <a href="#shop" className="hover:neon-text-yellow transition-all">Shop</a>
              <a href="#faq" className="hover:text-white transition-all">FAQ</a>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 group"
          >
            <span className="text-3xl group-hover:neon-text-green transition-all">🛍️</span>
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

      {/* Main Content View Switcher */}
      {currentView === 'about' ? (
        <AboutPage />
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
            <div className="max-w-6xl">
              <h1 className="text-7xl md:text-9xl mb-6 leading-tight">
                ELEVATE YOUR <span className="text-[#39FF14]">HIGH</span> &<br /> GO KINDA CRAZY
              </h1>
              <p className="text-xl md:text-2xl body-font max-w-4xl mx-auto mb-16 opacity-80 leading-relaxed">
                WHEW! I am so incredibly hyped that you found your way to our corner of the internet!
                If you're looking for a place that's obsessed with the best vibes, the prettiest nugs,
                and a total passion for the plant, then you are exactly where you belong!
                Welcome to the CannaCrazy Social Club!
              </p>

              {/* Budtender Integration */}
              <div className="mb-20">
                <Budtender onAddToCart={handleAddToCart} />
              </div>

              <div className="text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                <span className="w-12 h-[2px] bg-[#39FF14]"></span>
                Trusted by 10k+ Stoners
                <span className="w-12 h-[2px] bg-[#39FF14]"></span>
              </div>
            </div>
          </section>

          {/* Info Blocks */}
          <section className="py-32 px-6 bg-white text-black rounded-[5rem] mx-4 md:mx-10 relative z-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
              <div className="space-y-6 group">
                <div className="w-20 h-20 bg-[#39FF14] rounded-3xl flex items-center justify-center transform rotate-3 group-hover:rotate-12 transition-transform">
                  <span className="text-4xl text-black">✨</span>
                </div>
                <h2 className="text-4xl">The Best Vibes</h2>
                <p className="body-font text-lg leading-relaxed">
                  Our energy is high, our jars are full, and our community is the best in the business.
                </p>
              </div>
              <div className="space-y-6 group">
                <div className="w-20 h-20 bg-[#BC13FE] rounded-3xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="text-4xl text-white">🤝</span>
                </div>
                <h2 className="text-4xl">Community First</h2>
                <p className="body-font text-lg leading-relaxed">
                  We believe in responsible enjoyment, education, and looking out for our family.
                </p>
              </div>
              <div className="space-y-6 group">
                <div className="w-20 h-20 bg-[#FBFF00] rounded-3xl flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform">
                  <span className="text-4xl text-black">🔑</span>
                </div>
                <h2 className="text-4xl">Exclusive Access</h2>
                <p className="body-font text-lg leading-relaxed">
                  As a private social club, our members get the inside track on new drops, special events, and rare finds.
                </p>
              </div>
            </div>
          </section>

          {/* Shop Sections with Graded Tunnels */}
          <section id="shop" className="py-20 px-6">
            <div className="max-w-[1920px] mx-auto space-y-32">

              {/* FLOWER / BUD */}
              <div>
                <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
                  <h2 className="text-6xl md:text-8xl text-white">FLOWER / BUD</h2>
                  <div className="mb-4 text-gray-500 font-bold uppercase tracking-widest hidden md:block">[ GRADED MENU ]</div>
                </div>

                <div className="space-y-16">
                  {/* Greenhouse Tunnel */}
                  <div className="border-l-4 border-l-[#FBFF00] pl-6">
                    <h3 className="text-3xl font-bold uppercase text-[#FBFF00] mb-6 tracking-wider">Greenhouse Selection</h3>
                    <ProductScroll items={FLOWERS_GREENHOUSE} onProductClick={setSelectedProduct} />
                  </div>

                  {/* Grade A Tunnel */}
                  <div className="border-l-4 border-l-white/50 pl-6">
                    <h3 className="text-3xl font-bold uppercase text-white/50 mb-6 tracking-wider">Grade A</h3>
                    <ProductScroll items={FLOWERS_A} onProductClick={setSelectedProduct} color="#FFF" />
                  </div>

                  {/* Grade AA Tunnel */}
                  <div className="border-l-4 border-l-[#BC13FE] pl-6">
                    <h3 className="text-3xl font-bold uppercase text-[#BC13FE] mb-6 tracking-wider">Grade AA</h3>
                    <ProductScroll items={FLOWERS_AA} onProductClick={setSelectedProduct} color="#BC13FE" />
                  </div>

                  {/* Grade AAA Tunnel */}
                  <div className="border-l-4 border-l-[#39FF14] pl-6">
                    <h3 className="text-3xl font-bold uppercase text-[#39FF14] mb-6 tracking-wider flex items-center gap-4">
                      Grade AAA <span className="text-xs bg-[#39FF14] text-black px-2 py-1 rounded font-black">TOP SHELF</span>
                    </h3>
                    <ProductScroll items={FLOWERS_AAA} onProductClick={setSelectedProduct} />
                  </div>
                </div>
              </div>

              {/* PRE-ROLLS */}
              <div>
                <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
                  <h2 className="text-6xl md:text-8xl text-[#39FF14]">PRE-ROLLS</h2>
                </div>
                {/* Just one grade shown for brevity as per data, but structure supports more */}
                <div className="border-l-4 border-l-[#39FF14] pl-6">
                  <h3 className="text-3xl font-bold uppercase text-[#39FF14] mb-6 tracking-wider">House Favorites</h3>
                  <ProductScroll items={PREROLLS} onProductClick={setSelectedProduct} color="#39FF14" />
                </div>
              </div>

              {/* EDIBLES */}
              <div className="relative">
                <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
                  <h2 className="text-6xl md:text-8xl text-[#FBFF00]">EDIBLES</h2>
                </div>
                <ProductScroll items={EDIBLES} onProductClick={setSelectedProduct} color="#FBFF00" />
              </div>

              {/* CBD SECTION */}
              <div>
                <div className="max-w-7xl mx-auto flex items-end gap-6 mb-12">
                  <h2 className="text-6xl md:text-8xl text-white">CBD & WELLNESS</h2>
                </div>
                <ProductScroll items={CBD} onProductClick={setSelectedProduct} color="#FFF" />
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
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQSection />

          {/* Testimonials - Real Reviews */}
          <section id="fam" className="py-20 px-6 overflow-hidden bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto mb-12">
              <h2 className="text-5xl md:text-7xl mb-4 text-center neon-text-green">WHAT THE FAM SAYS</h2>
              <p className="text-center body-font text-gray-400 uppercase tracking-widest text-sm">Real reviews from real stoners</p>
            </div>

            <style>{`
              @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .testimonial-track {
                animation: scroll-left 40s linear infinite;
              }
              .testimonial-track:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="relative">
              <div className="flex gap-6 testimonial-track">
                {[
                  { name: "Justin Smit", review: "Probably the best smoke shop I've ever been to. The service is amazing, stock always unique and new and the community that has been formed by the visitors and staff is unbelievable. I wish I could give them 10 stars.", stars: 5 },
                  { name: "Fabian Spadino", review: "One of the greatest places and most friendly people I've had the pleasure of meeting. Always willing to go that extra mile.", stars: 5 },
                  { name: "Jarrod Hager", review: "Amazing family, amazing spot for some herb", stars: 5 },
                  { name: "William Smith", review: "Beautiful place, absolutely amazing people and vibe 💯", stars: 5 },
                  { name: "Marna Steinhobel", review: "The best service, the best people, the best vibes. You guys are awesome!", stars: 5 },
                  // Duplicate for seamless loop
                  { name: "Justin Smit", review: "Probably the best smoke shop I've ever been to. The service is amazing, stock always unique and new and the community that has been formed by the visitors and staff is unbelievable. I wish I could give them 10 stars.", stars: 5 },
                  { name: "Fabian Spadino", review: "One of the greatest places and most friendly people I've had the pleasure of meeting. Always willing to go that extra mile.", stars: 5 },
                  { name: "Jarrod Hager", review: "Amazing family, amazing spot for some herb", stars: 5 },
                  { name: "William Smith", review: "Beautiful place, absolutely amazing people and vibe 💯", stars: 5 },
                  { name: "Marna Steinhobel", review: "The best service, the best people, the best vibes. You guys are awesome!", stars: 5 },
                ].map((testimonial, i) => (
                  <div key={i} className="flex-shrink-0 w-[400px] bg-[#111] p-8 rounded-[2rem] border-2 border-white/10 hover:border-[#39FF14] transition-all">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.stars }).map((_, idx) => (
                        <span key={idx} className="text-[#39FF14] text-xl">★</span>
                      ))}
                    </div>
                    <p className="body-font italic text-gray-300 mb-6 leading-relaxed text-lg">"{testimonial.review}"</p>
                    <div className="heading-font text-[#39FF14]">— {testimonial.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-40 px-6 flex flex-col items-center justify-center text-center bg-[#39FF14] text-black">
            <h2 className="text-6xl md:text-9xl mb-8 leading-none">DON'T BE A <br /><span className="bg-black text-[#39FF14] px-4">STRANGER</span></h2>
            <p className="text-2xl body-font max-w-2xl mb-12 font-bold uppercase">
              JOIN 5,000+ CANNACRAZY MEMBERS GETTING EXCLUSIVE DEALS EVERY MONTH.
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
        </>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/10 body-font text-xs uppercase tracking-widest text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-8">
          <div className="text-center md:text-left">
            © 2026 CANNACRAZY CO. • BORN IN THE STREETS • ALL RIGHTS RESERVED
          </div>

          <div className="flex gap-8 font-bold items-center">
            <a href="#" className="hover:text-[#39FF14] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#BC13FE] transition-colors">Facebook</a>
            <a
              href="https://share.google/TjyLs40opB0T0vNAq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white"
            >
              <span>Find Us 📍</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed bottom-6 left-6 right-6 z-[90] md:hidden">
        {currentView === 'home' && (
          <button
            onClick={() => {
              const shopSection = document.getElementById('shop');
              shopSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-5 bg-[#39FF14] text-black font-black text-xl rounded-2xl shadow-2xl border-2 border-black"
          >
            SHOP NOW
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
