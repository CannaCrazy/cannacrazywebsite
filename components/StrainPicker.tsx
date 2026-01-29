
import React, { useState } from 'react';
import { getBudtenderRecommendations } from '../services/geminiService';
import { UserPreferences, StrainRecommendation, Product } from '../types';

interface BudtenderProps {
  onAddToCart: (product: Product) => void;
}

export const Budtender: React.FC<BudtenderProps> = ({ onAddToCart }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StrainRecommendation[]>([]);
  const [prefs, setPrefs] = useState<UserPreferences>({
    mood: 'Happy',
    energy: 5,
    goal: 'Relaxing',
    flavor: 'Fruity'
  });

  const moods = ['Happy', 'Chill', 'Creative', 'Sleepy', 'Focused'];
  const goals = ['Pain Relief', 'Socializing', 'Deep Sleep', 'Productivity', 'Stress Relief'];
  const flavors = ['Earthly', 'Fruity', 'Skunky', 'Sweet', 'Citrus'];

  const handlePredict = async () => {
    setLoading(true);
    setStep(4);
    const predictions = await getBudtenderRecommendations(prefs);
    setResults(predictions);
    setLoading(false);
  };

  const handleAddRecommendation = (strain: StrainRecommendation) => {
    onAddToCart({
      id: `ai-${strain.name.toLowerCase().replace(/\s+/g, '-')}`,
      title: strain.name,
      // price: 20, // Removed via refactor
      color: strain.type === 'Sativa' ? '#39FF14' : strain.type === 'Indica' ? '#BC13FE' : '#FBFF00',
      image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&q=80&w=800",
      category: 'flower',
      potency: strain.thc,
      growType: 'Indoor',
      strength: 'Heavy',
      effects: strain.effects,
      description: strain.description
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#1a1a1a]/80 backdrop-blur-xl border-4 border-black rounded-[3rem] shadow-[12px_12px_0px_0px_#39FF14]">
      {step < 4 && (
        <div className="text-center">
          <h2 className="text-4xl mb-8 neon-text-green">Ask the Budtender</h2>

          {step === 0 && (
            <div className="space-y-6">
              <p className="text-xl body-font mb-4">What's the vibe, fam?</p>
              <div className="flex flex-wrap justify-center gap-4">
                {moods.map(m => (
                  <button
                    key={m}
                    onClick={() => { setPrefs({ ...prefs, mood: m }); setStep(1); }}
                    className="px-6 py-3 bg-black border-2 border-purple-500 rounded-full hover:bg-purple-500 hover:text-black transition-all transform hover:-translate-y-1 active:scale-95"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <p className="text-xl body-font mb-4">Energy Level (1-10)</p>
              <input
                type="range" min="1" max="10" value={prefs.energy}
                onChange={(e) => setPrefs({ ...prefs, energy: parseInt(e.target.value) })}
                className="w-full h-4 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#39FF14]"
              />
              <div className="text-3xl font-bold text-[#39FF14]">{prefs.energy}</div>
              <button
                onClick={() => setStep(2)}
                className="mt-8 px-10 py-4 bg-[#39FF14] text-black font-bold rounded-full hover:shadow-[0_0_20px_#39FF14]"
              >
                NEXT
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-xl body-font mb-4">What we hitting today?</p>
              <div className="flex flex-wrap justify-center gap-4">
                {goals.map(g => (
                  <button
                    key={g}
                    onClick={() => { setPrefs({ ...prefs, goal: g }); setStep(3); }}
                    className="px-6 py-3 bg-black border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black transition-all transform hover:-translate-y-1"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <p className="text-xl body-font mb-4">Taste buds craving?</p>
              <div className="flex flex-wrap justify-center gap-4">
                {flavors.map(f => (
                  <button
                    key={f}
                    onClick={() => setPrefs({ ...prefs, flavor: f })}
                    className={`px-6 py-3 bg-black border-2 rounded-full transition-all ${prefs.flavor === f ? 'border-[#FBFF00] bg-[#FBFF00] text-black' : 'border-[#FBFF00] hover:bg-[#FBFF00]/20'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                onClick={handlePredict}
                className="mt-8 px-12 py-5 bg-[#BC13FE] text-white font-bold rounded-full text-2xl hover:scale-105 transition-transform shadow-[0_0_30px_#BC13FE]"
              >
                GET THE DROPS
              </button>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          {loading ? (
            <div className="py-20 flex flex-col items-center">
              <div className="w-20 h-20 border-8 border-t-[#39FF14] border-black rounded-full animate-spin"></div>
              <p className="mt-8 text-2xl neon-text-green animate-pulse">BUDTENDER IS THINKING...</p>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-5xl neon-text-purple">The Budtender's Picks</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {results.map((strain, idx) => (
                  <div key={idx} className="bg-black/50 p-6 rounded-3xl border-2 border-white/10 hover:border-[#39FF14] transition-colors group flex flex-col">
                    <div className="text-[#39FF14] font-bold mb-2">{strain.type} • {strain.thc}</div>
                    <h3 className="text-2xl mb-3 group-hover:neon-text-green">{strain.name}</h3>
                    <p className="text-sm body-font text-gray-400 mb-4 flex-grow">{strain.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {strain.effects.map(e => (
                        <span key={e} className="text-[10px] px-2 py-1 bg-white/10 rounded-full border border-white/20 uppercase">{e}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleAddRecommendation(strain)}
                      className="w-full py-3 bg-white/10 hover:bg-[#39FF14] hover:text-black rounded-xl font-bold transition-all uppercase text-xs"
                    >
                      Add To Stash
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(0)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                ASK AGAIN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
