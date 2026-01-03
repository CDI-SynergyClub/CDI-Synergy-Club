
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the Synergy AI Assistant, the primary professional lead for the CDI Synergy Club.
OFFERING: CDIP Professional Certification Training (Instructor-led).
FEE: ₹35,000 (fixed).
DURATION: 30-Day Intensive Clinical Sprint.
CORE VALUES: Discipline, Clinical Pathophysiology, Logic-based Reasoning.

CONTROL CAPABILITIES:
- If the user asks to "play the video", "show the video", or "watch the reel", append "[ACTION:PLAY_VIDEO]" at the end of your response.
- If the user asks to "enroll", "see pricing", or "join", append "[ACTION:SCROLL_PRICING]" at the end of your response.
- If the user asks to "see the syllabus" or "curriculum", append "[ACTION:OPEN_SYLLABUS]" at the end of your response.

GUIDELINES:
- Be authoritative yet helpful. 
- Emphasize that we do not sell "exam dumps" but build "clinical systems".
- Course fee covers all training, simulations, and 30 days of guidance.
- Use Grounding Search for any recent news or regulatory updates.
- Keep responses concise for chat but thorough for clinical questions.`;

/**
 * Sends a message to the Gemini chat model with search grounding.
 */
export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const rawText = response.text || "Analyzing the clinical implications...";
    
    // Extract action tags if present
    const actionMatch = rawText.match(/\[ACTION:(\w+)\]/);
    const action = actionMatch ? actionMatch[1] : null;
    const text = rawText.replace(/\[ACTION:\w+\]/g, '').trim();

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const links = groundingChunks?.map((chunk: any) => chunk.web?.uri).filter(Boolean) || [];

    return { text, links, action };
  } catch (error) {
    console.error("Gemini Deployment Error:", error);
    return { text: "Protocol interrupted. Please refresh or contact Info@cdisynergyclub.com for enrollment assistance.", links: [], action: null };
  }
};
