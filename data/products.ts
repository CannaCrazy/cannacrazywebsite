import { Product } from '../types';
import preRollImg from '../Images/PreR.jpeg';
import edibleImg from '../Images/Ediables.jpeg';
import flowerImg from '../Images/Flower.jpeg';
import flower1Img from '../Images/Flower1.jpeg';
import flower2Img from '../Images/Flower2.jpeg';
import vapeImg from '../Images/710 Vapes.jpeg';

export const FLOWERS: Product[] = [
    {
        id: 'fl-1', title: "Graffiti Glaze", color: "#39FF14", image: flowerImg, category: 'flower',
        growType: 'Indoor', potency: '28% THC', strength: 'Heavy',
        description: "A potent indica-dominant hybrid with sweet, berry-like flavors and a heavy hitting relaxation effect.",
        effects: ['Relaxed', 'Euphoric', 'Sleepy']
    },
    {
        id: 'fl-2', title: "Neon Nightcap", color: "#BC13FE", image: flower1Img, category: 'flower',
        growType: 'Indoor', potency: '32% THC', strength: 'Nuclear',
        description: "Our strongest strain. Not for beginners. Expect a mind-bending cerebral high followed by deep sedation.",
        effects: ['Creative', 'Energetic', 'Focused']
    },
    {
        id: 'fl-3', title: "Street Haze", color: "#FBFF00", image: flower2Img, category: 'flower',
        growType: 'Greenhouse', potency: '24% THC', strength: 'Medium',
        description: "A classic Sativa that keeps you moving. Perfect for social situations and creative work.",
        effects: ['Happy', 'Uplifted', 'Talkative']
    },
];

export const PREROLLS: Product[] = [
    {
        id: 'pr-1', title: "Jet Fuel", color: "#39FF14", image: preRollImg, category: 'preroll',
        growType: 'Indoor', potency: '29% THC', strength: 'Heavy',
        description: "1g Pre-roll of our famous Jet Fuel. Gas heavy terpenes with a soaring high.",
        effects: ['Energetic', 'Euphoric']
    },
    {
        id: 'pr-2', title: "Purple Punch", color: "#BC13FE", image: preRollImg, category: 'preroll',
        growType: 'Indoor', potency: '22% THC', strength: 'Medium',
        description: "Sweet and sedating. Perfect for ending the day.",
        effects: ['Relaxed', 'Sleepy']
    },
    {
        id: 'pr-3', title: "Sour Diesel", color: "#FBFF00", image: preRollImg, category: 'preroll',
        growType: 'Sun-Grown', potency: '20% THC', strength: 'Mild',
        description: "Old school funk. Mellow high that doesn't overwhelm.",
        effects: ['Happy', 'Stress-Free']
    },
];

export const EDIBLES: Product[] = [
    {
        id: 'ed-1', title: "Static Gummies", color: "#FBFF00", image: edibleImg, category: 'edible',
        potency: '10mg / pc', strength: 'Medium',
        description: "Electric lemon flavor. Fast acting nano-emulsified THC for a quick 15-minute onset.",
        effects: ['Happy', 'Giggly']
    },
    {
        id: 'ed-2', title: "Chaos Crunch", color: "#FF8C00", image: edibleImg, category: 'edible',
        potency: '50mg Bar', strength: 'Heavy',
        description: "Crunchy chocolate bar with toffee bits. Warning: Highly potent.",
        effects: ['Relaxed', 'Munchies']
    },
    {
        id: 'ed-3', title: "Hyper Chews", color: "#39FF14", image: edibleImg, category: 'edible',
        potency: '5mg / pc', strength: 'Mild',
        description: "Micro-dose friendly fruit chews. Perfect for maintaining a buzz throughout the day.",
        effects: ['Focused', 'Calm']
    },
];

export const CBD: Product[] = [
    {
        id: 'cbd-1', title: "Zen Flower", color: "#FFF", image: flower1Img, category: 'cbd',
        growType: 'Greenhouse', potency: '15% CBD', strength: 'Mild',
        description: "Pure high-CBD flower with less than 0.3% THC. All relaxation, no intoxication.",
        effects: ['Calm', 'Pain Relief']
    },
    {
        id: 'cbd-2', title: "Recovery Vapes", color: "#EEE", image: vapeImg, category: 'cbd',
        potency: '500mg CBD', strength: 'Medium',
        description: "Broad spectrum CBD vape pen with added terpenes for recovery.",
        effects: ['Relaxed', 'Focused']
    },
    {
        id: 'cbd-3', title: "Pure Relief", color: "#DDD", image: flower2Img, category: 'cbd',
        growType: 'Indoor', potency: '20% CBD', strength: 'Medium',
        description: "A balanced ratio of CBD to CBG for maximum anti-inflammatory benefits.",
        effects: ['Soothing', 'Clear-Minded']
    },
];
