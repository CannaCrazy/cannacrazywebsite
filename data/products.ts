import { Product } from '../types';
import preRollImg from '../Images/PreR.jpeg';
import edibleImg from '../Images/Ediables.jpeg';
import flowerImg from '../Images/Flower.jpeg';
import flower1Img from '../Images/Flower1.jpeg';
import flower2Img from '../Images/Flower2.jpeg';
import vapeImg from '../Images/710 Vapes.jpeg';

export const FLOWERS_GREENHOUSE: Product[] = [
    {
        id: 'fl-gh-1', title: "Sun Kissed Haze", color: "#FBFF00", image: flower2Img, category: 'flower', grade: 'Greenhouse',
        growType: 'Greenhouse', potency: '18% THC', strength: 'Mild',
        description: "Naturally grown under the sun. Mild buzz, great flavor.",
        effects: ['Happy', 'Social']
    },
    {
        id: 'fl-gh-2', title: "Nature's Gift", color: "#39FF14", image: flower2Img, category: 'flower', grade: 'Greenhouse',
        growType: 'Greenhouse', potency: '16% THC', strength: 'Mild',
        description: "Budget friendly, perfect for rolling massive joints.",
        effects: ['Relaxed', 'Mellow']
    },
    {
        id: 'fl-gh-3', title: "Buzz Light", color: "#BC13FE", image: flower2Img, category: 'flower', grade: 'Greenhouse',
        growType: 'Greenhouse', potency: '19% THC', strength: 'Medium',
        description: "A solid daily driver. Nothing too crazy, just good vibes.",
        effects: ['Creative', 'Calm']
    },
];

export const FLOWERS_A: Product[] = [
    {
        id: 'fl-a-1', title: "Classic Cheese", color: "#FBFF00", image: flowerImg, category: 'flower', grade: 'A',
        growType: 'Indoor', potency: '20% THC', strength: 'Medium',
        description: "Old school flavor profile. Reliable potency.",
        effects: ['Relaxed', 'Hungry']
    },
    {
        id: 'fl-a-2', title: "Lemon Pop", color: "#FBFF00", image: flowerImg, category: 'flower', grade: 'A',
        growType: 'Indoor', potency: '21% THC', strength: 'Medium',
        description: "Zesty citrus notes with a balanced hybrid high.",
        effects: ['Uplifted', 'Energetic']
    },
];

export const FLOWERS_AA: Product[] = [
    {
        id: 'fl-aa-1', title: "Purple Kush", color: "#BC13FE", image: flower1Img, category: 'flower', grade: 'AA',
        growType: 'Indoor', potency: '24% THC', strength: 'Heavy',
        description: "Deep purple hues and a heavy body high. Great for sleep.",
        effects: ['Sleepy', 'Relaxed']
    },
    {
        id: 'fl-aa-2', title: "Gorilla Glue", color: "#39FF14", image: flower1Img, category: 'flower', grade: 'AA',
        growType: 'Indoor', potency: '25% THC', strength: 'Heavy',
        description: "Sticky, pungent, and powerful. Couch-lock warning.",
        effects: ['Euphoric', 'Sedated']
    },
];

export const FLOWERS_AAA: Product[] = [
    {
        id: 'fl-aaa-1', title: "Graffiti Glaze", color: "#39FF14", image: flowerImg, category: 'flower', grade: 'AAA',
        growType: 'Indoor', potency: '28% THC', strength: 'Heavy',
        description: "A potent indica-dominant hybrid with sweet, berry-like flavors.",
        effects: ['Relaxed', 'Euphoric', 'Sleepy']
    },
    {
        id: 'fl-aaa-2', title: "Neon Nightcap", color: "#BC13FE", image: flower1Img, category: 'flower', grade: 'AAA',
        growType: 'Indoor', potency: '32% THC', strength: 'Nuclear',
        description: "Our strongest strain. Not for beginners. Expect a mind-bending cerebral high.",
        effects: ['Creative', 'Energetic']
    }
];

export const PREROLLS: Product[] = [
    {
        id: 'pr-1', title: "Jet Fuel", color: "#39FF14", image: preRollImg, category: 'preroll',
        growType: 'Indoor', potency: '29% THC', strength: 'Heavy',
        description: "1g Pre-roll of our famous Jet Fuel. Gas heavy terpenes.",
        effects: ['Energetic', 'Euphoric']
    },
    {
        id: 'pr-2', title: "Purple Punch", color: "#BC13FE", image: preRollImg, category: 'preroll',
        growType: 'Indoor', potency: '22% THC', strength: 'Medium',
        description: "Sweet and sedating. Perfect for ending the day.",
        effects: ['Relaxed', 'Sleepy']
    },
];

export const EDIBLES: Product[] = [
    {
        id: 'ed-1', title: "Static Gummies", color: "#FBFF00", image: edibleImg, category: 'edible',
        potency: '10mg / pc', strength: 'Medium',
        description: "Electric lemon flavor. Fast acting nano-emulsified THC.",
        effects: ['Happy', 'Giggly']
    },
    {
        id: 'ed-2', title: "Chaos Crunch", color: "#FF8C00", image: edibleImg, category: 'edible',
        potency: '50mg Bar', strength: 'Heavy',
        description: "Crunchy chocolate bar with toffee bits. Warning: Highly potent.",
        effects: ['Relaxed', 'Munchies']
    },
];

export const CBD: Product[] = [
    {
        id: 'cbd-1', title: "Zen Flower", color: "#FFF", image: flower1Img, category: 'cbd',
        growType: 'Greenhouse', potency: '15% CBD', strength: 'Mild',
        description: "Pure high-CBD flower with less than 0.3% THC.",
        effects: ['Calm', 'Pain Relief']
    },
    {
        id: 'cbd-2', title: "Recovery Vapes", color: "#EEE", image: vapeImg, category: 'cbd',
        potency: '500mg CBD', strength: 'Medium',
        description: "Broad spectrum CBD vape pen with added terpenes.",
        effects: ['Relaxed', 'Focused']
    },
];
