import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

export const initGemini = () => {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return ai;
};
