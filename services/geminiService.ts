
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, StrainRecommendation } from "../types";

export const getBudtenderRecommendations = async (prefs: UserPreferences): Promise<StrainRecommendation[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const prompt = `You are a legendary Digital Budtender at CannaCrazy. 
  Based on these customer vibes:
  Mood: ${prefs.mood}
  Energy Level Needed: ${prefs.energy}/10
  Desired Goal: ${prefs.goal}
  Flavor Choice: ${prefs.flavor}
  
  Recommend 3 fire cannabis strains that are popular and hit these requirements. 
  Provide details including name, type (Sativa/Indica/Hybrid), THC percentage, primary effects, and a description that sounds like a pro budtender speaking to a streetwear-loving customer.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              thc: { type: Type.STRING },
              effects: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING },
              mood: { type: Type.STRING }
            },
            required: ["name", "type", "thc", "effects", "description", "mood"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as StrainRecommendation[];
  } catch (error) {
    console.error("Budtender Error:", error);
    return [
      {
        name: "CannaCrazy OG",
        type: "Hybrid",
        thc: "24%",
        effects: ["Euphoric", "Creative", "Relaxed"],
        description: "The house special. Street-smart energy meets deep relaxation. It's the vibe you've been looking for.",
        mood: "Balanced"
      },
      {
        name: "Neon Sativa",
        type: "Sativa",
        thc: "28%",
        effects: ["Energetic", "Focused", "Happy"],
        description: "Liquid sunshine. Perfect for when you need that creative spark for a late-night session.",
        mood: "Energetic"
      }
    ];
  }
};
