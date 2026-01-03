
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { sendMessageToGemini } from '../services/geminiService';

// --- Audio Utility Functions ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string, links?: string[] }[]>([
    { role: 'model', text: 'Welcome to the Synergy Intelligence Console. I am your CDIP readiness lead. How can I assist your professional pivot today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessionRef = useRef<any>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const starters = [
    "What is the course fee?",
    "Show me the syllabus",
    "How does the 30-day sprint work?",
    "Why Synergy over self-study?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({ role: msg.role, text: msg.text }));
      const result = await sendMessageToGemini(textToSend, history);
      
      setMessages(prev => [...prev, { role: 'model', text: result.text, links: result.links }]);
      
      // Handle UI Actions from AI
      if (result.action) {
        window.dispatchEvent(new CustomEvent('synergy-action', { detail: { type: result.action } }));
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Protocol error. Please retry.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextInRef.current = inputCtx;
      audioContextOutRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            (window as any)._synergyMicStream = stream;
            (window as any)._synergyScriptProcessor = scriptProcessor;
          },
          onmessage: async (message) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              const audioBuffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              activeSourcesRef.current.add(source);
              source.onended = () => activeSourcesRef.current.delete(source);
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: (e) => console.error(e)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are the Synergy AI Assistant. In voice mode, be brief and professional.",
        },
      });
      sessionRef.current = await sessionPromise;
      setIsVoiceActive(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopVoiceSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if ((window as any)._synergyMicStream) (window as any)._synergyMicStream.getTracks().forEach((t: any) => t.stop());
    if (audioContextInRef.current) audioContextInRef.current.close();
    if (audioContextOutRef.current) audioContextOutRef.current.close();
    setIsVoiceActive(false);
  };

  const closeChat = () => {
    stopVoiceSession();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-brand-600 to-indigo-700 rounded-full shadow-[0_8px_32px_rgba(79,70,229,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-2 border-white/20"
        >
          <div className="relative">
            <i className="fa-solid fa-bolt-lightning text-white text-xl md:text-2xl group-hover:animate-pulse"></i>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping"></span>
          </div>
        </button>
      ) : (
        <div className="w-[calc(100vw-3rem)] md:w-[420px] h-[600px] max-h-[80vh] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <div className="p-5 bg-gradient-to-r from-brand-700 to-indigo-900 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <i className={`fa-solid ${isVoiceActive ? 'fa-volume-high animate-bounce' : 'fa-brain'} text-white text-lg`}></i>
              </div>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-tight">Synergy Intelligence</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isVoiceActive ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                  <p className="text-brand-100 text-[10px] font-bold uppercase tracking-widest">
                    {isVoiceActive ? 'Voice Active' : 'Online'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => isVoiceActive ? stopVoiceSession() : startVoiceSession()}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isVoiceActive ? 'bg-red-500' : 'bg-white/10'}`}
              >
                <i className={`fa-solid ${isVoiceActive ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>
              <button 
                onClick={closeChat} 
                className="w-9 h-9 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-all flex items-center justify-center"
              >
                <i className="fa-solid fa-chevron-down text-sm"></i>
              </button>
              <button 
                onClick={closeChat} 
                className="w-9 h-9 bg-white/10 rounded-lg hover:bg-red-500/80 transition-all flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-2xl rounded-tr-none px-5 py-3.5' : 'bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="p-3 bg-white w-fit rounded-xl border border-slate-100 animate-pulse">Thinking...</div>}
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
            {!isLoading && messages.length < 3 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {starters.map((s, idx) => (
                  <button key={idx} onClick={() => handleSend(s)} className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-2 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-all border border-slate-200">{s}</button>
                ))}
              </div>
            )}
            <div className="relative flex items-center gap-3">
              <input 
                type="text" value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your clinical query..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand-600"
              />
              <button onClick={() => handleSend()} disabled={!input.trim() || isLoading} className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center hover:bg-brand-700 disabled:opacity-50 shadow-lg">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
