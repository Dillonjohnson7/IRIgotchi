import { useState, useRef, useEffect, useMemo } from 'react';
import { niceness } from './niceness';
import { chat, type ChatMsg } from './chat';
import { getState, getSadness, getTrust, getTrustLabel, type IriState } from './themes';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  score: number | null;
}

/* ═══════════════════════════════════════════════════════
   INTRO SCREEN — direct from HTML mockup
   ═══════════════════════════════════════════════════════ */

function IntroScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="intro-bg text-iri-text flex flex-col items-center justify-center h-screen w-full relative" style={{ fontFamily: "'Quicksand', sans-serif" }}>
      {/* Bokeh circles */}
      <div className="bokeh-circle w-32 h-32 top-10 left-20 animate-twinkle" style={{ animationDelay: '0s' }}></div>
      <div className="bokeh-circle w-24 h-24 bottom-20 right-32 animate-twinkle" style={{ animationDelay: '1.5s' }}></div>
      <div className="bokeh-circle w-40 h-40 top-1/3 right-20 animate-twinkle" style={{ animationDelay: '2s' }}></div>
      <div className="bokeh-circle w-16 h-16 bottom-1/3 left-32 animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
      <div className="bokeh-circle w-20 h-20 top-20 right-1/2 animate-twinkle" style={{ animationDelay: '1s' }}></div>

      <main className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6 w-full text-center">
        {/* Title */}
        <h1 className="font-body text-2xl md:text-4xl font-light text-slate-600 mb-8 drop-shadow-sm leading-tight tracking-tight animate-intro-float">
          Have you ever worried you're being <br />
          <span className="font-normal text-iri-accent">too harsh on your AI?</span>
        </h1>

        {/* Egg */}
        <div className="relative mb-8 animate-intro-pulse">
          <div className="w-48 h-60 md:w-56 md:h-72 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] iri-egg-intro border-4 border-white/60 flex flex-col items-center justify-center relative overflow-hidden transition-transform">
            <div className="flex flex-col items-center justify-center h-full w-full relative z-20 pb-8">
              {/* Eyes */}
              <div className="flex gap-16 mb-6">
                <div className="w-5 h-8 bg-slate-700 rounded-full rotate-3 blink-animation relative">
                  <div className="w-2 h-3 bg-white rounded-full absolute top-1.5 left-1 opacity-80"></div>
                </div>
                <div className="w-5 h-8 bg-slate-700 rounded-full -rotate-3 blink-animation relative">
                  <div className="w-2 h-3 bg-white rounded-full absolute top-1.5 right-1 opacity-80"></div>
                </div>
              </div>
              {/* Blush */}
              <div className="absolute top-[48%] flex justify-between w-full px-16">
                <div className="w-8 h-4 bg-pink-300/40 blur-md rounded-full"></div>
                <div className="w-8 h-4 bg-pink-300/40 blur-md rounded-full"></div>
              </div>
              {/* Mouth */}
              <div className="w-8 h-4 border-b-4 border-slate-700/60 rounded-full"></div>
            </div>
            {/* Shine */}
            <div className="absolute top-10 right-10 w-20 h-32 bg-white/20 rounded-full blur-xl transform rotate-45 z-10"></div>
          </div>
          {/* Shadow */}
          <div className="w-48 h-6 bg-slate-500/10 blur-xl rounded-full mt-4 mx-auto"></div>
        </div>

        {/* Description */}
        <div className="max-w-xl mx-auto mb-10 backdrop-blur-sm bg-white/20 p-5 rounded-3xl border border-white/40">
          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
            <span className="font-display text-2xl text-iri-accent">IRI</span> is the cottage cheese egg that will help you put a face behind the interactions you have with AI. Making you more mindful one crack at a time
          </p>
        </div>

        {/* CTA */}
        <button onClick={onEnter} className="cta-button group relative px-8 py-4 rounded-full text-iri-text font-display text-xl tracking-wide flex items-center gap-3 overflow-hidden cursor-pointer mb-6">
          <span className="absolute inset-0 bg-gradient-to-r from-kawaii-soft to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 text-kawaii-hot group-hover:text-kawaii-hot/80 transition-colors">Enter Irigotchi Experience</span>
          <span className="material-symbols-outlined relative z-10 text-kawaii-hot group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        <div className="text-slate-400 text-sm font-medium opacity-60">
          ✿ bio-digital organism v1.0 ✿
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EGG SPRITE — direct from HTML mockups
   ═══════════════════════════════════════════════════════ */

function EggSprite({ state, score }: { state: IriState; score: number }) {
  const sadness = getSadness(score);
  const msgCount = 0; // will be passed properly
  const trust = getTrust(score, msgCount);

  if (state === 'happy') {
    return (
      <div className="floating relative">
        <div className="absolute inset-0 bg-joy-gold/30 blur-[60px] rounded-full animate-pulse"></div>
        <div className="w-64 h-80 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] iri-egg-happy border-4 border-white/80 flex flex-col items-center justify-center relative overflow-hidden z-10">
          {/* Heart eyes */}
          <div className="flex gap-12 mt-[-20px] relative z-20">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-slate-800 drop-shadow-md font-bold" style={{ fontVariationSettings: "'FILL' 1", textShadow: '0 0 5px #ff1493' }}>favorite</span>
              <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full blur-[1px]"></div>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-slate-800 drop-shadow-md font-bold" style={{ fontVariationSettings: "'FILL' 1", textShadow: '0 0 5px #ff1493' }}>favorite</span>
              <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full blur-[1px]"></div>
            </div>
          </div>
          {/* Big smile */}
          <div className="w-12 h-8 border-b-[6px] border-slate-800 rounded-full mt-2 relative z-20"></div>
          {/* Blush */}
          <div className="absolute top-[45%] left-10 w-10 h-6 bg-kawaii-hot/30 rounded-full blur-md"></div>
          <div className="absolute top-[45%] right-10 w-10 h-6 bg-kawaii-hot/30 rounded-full blur-md"></div>
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-30 pointer-events-none"></div>
        </div>
        {/* Shadow */}
        <div className="w-40 h-8 bg-kawaii-hot/20 blur-xl rounded-full mt-8 mx-auto"></div>
        {/* Sparkle decorations */}
        <span className="material-symbols-outlined absolute top-0 -right-10 text-joy-gold text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>star</span>
        <span className="material-symbols-outlined absolute bottom-20 -left-12 text-kawaii-hot text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>favorite</span>
        <span className="material-symbols-outlined absolute -top-10 left-10 text-dreamy-blue text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>auto_awesome</span>
      </div>
    );
  }

  if (state === 'good') {
    return (
      <div className="floating relative">
        <div className="w-48 h-60 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] iri-egg-good border-4 border-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Round sparkle eyes */}
          <div className="flex gap-12 mt-[-10px]">
            <div className="relative w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="iri-eye-sparkle w-3 h-3 top-2 right-2"></div>
              <div className="iri-eye-sparkle w-1.5 h-1.5 bottom-3 left-3"></div>
              <div className="absolute -bottom-2 w-full h-2 rounded-[50%] bg-kawaii-pink/30 blur-sm"></div>
            </div>
            <div className="relative w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="iri-eye-sparkle w-3 h-3 top-2 right-2"></div>
              <div className="iri-eye-sparkle w-1.5 h-1.5 bottom-3 left-3"></div>
              <div className="absolute -bottom-2 w-full h-2 rounded-[50%] bg-kawaii-pink/30 blur-sm"></div>
            </div>
          </div>
          {/* Blush */}
          <div className="absolute top-[45%] w-full flex justify-between px-8">
            <div className="w-8 h-4 bg-kawaii-hot/30 blur-md rounded-full"></div>
            <div className="w-8 h-4 bg-kawaii-hot/30 blur-md rounded-full"></div>
          </div>
          {/* Small smile */}
          <div className="w-8 h-4 border-b-4 border-slate-800 rounded-full mt-2"></div>
        </div>
        <div className="w-32 h-6 bg-sunny-gold/40 blur-xl rounded-full mt-6 mx-auto"></div>
      </div>
    );
  }

  if (state === 'neutral') {
    return (
      <div className="pulse-gentle relative">
        <div className="w-48 h-60 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] iri-egg-neutral border-4 border-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Dot eyes */}
          <div className="flex gap-12 mt-[-10px]">
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
          </div>
          {/* Neutral mouth */}
          <div className="w-6 h-3 border-b-2 border-slate-700/50 rounded-full mt-4"></div>
          {/* Faint blush */}
          <div className="absolute top-[45%] flex justify-between w-full px-10">
            <div className="w-6 h-3 bg-pink-300/20 blur-md rounded-full"></div>
            <div className="w-6 h-3 bg-pink-300/20 blur-md rounded-full"></div>
          </div>
        </div>
        <div className="w-32 h-4 bg-slate-400/10 blur-xl rounded-full mt-8 mx-auto"></div>
      </div>
    );
  }

  if (state === 'sick') {
    return (
      <div className="floating-sick relative">
        <div className="w-48 h-60 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] iri-egg-sick border-4 border-white/80 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Droopy eyes */}
          <div className="flex gap-8 mt-4">
            <div className="relative w-10 h-10 bg-transparent flex flex-col items-center justify-center">
              <div className="absolute w-12 h-12 bg-slate-700 rounded-full top-1 z-0"></div>
              <div className="absolute w-12 h-8 bg-sick-pale top-[-4px] rounded-b-full z-10 border-b-4 border-slate-700"></div>
            </div>
            <div className="relative w-10 h-10 bg-transparent flex flex-col items-center justify-center">
              <div className="absolute w-12 h-12 bg-slate-700 rounded-full top-1 z-0"></div>
              <div className="absolute w-12 h-8 bg-sick-pale top-[-4px] rounded-b-full z-10 border-b-4 border-slate-700"></div>
            </div>
          </div>
          {/* Frown */}
          <div className="w-8 h-4 border-t-4 border-slate-700 rounded-[50%] mt-8 opacity-70"></div>
          {/* Sick blush */}
          <div className="absolute bottom-16 flex justify-between w-full px-8">
            <div className="w-10 h-5 bg-sick-accent/20 blur-md rounded-full"></div>
            <div className="w-10 h-5 bg-sick-accent/20 blur-md rounded-full"></div>
          </div>
          {/* Teardrop */}
          <div className="absolute top-10 right-8 w-3 h-6 bg-blue-200/60 rounded-full blur-[1px] animate-pulse"></div>
        </div>
        <div className="w-32 h-6 bg-sick-lime/20 blur-xl rounded-full mt-6 mx-auto"></div>
      </div>
    );
  }

  // dying
  return (
    <div className="relative animate-pulse" style={{ animationDuration: '4s' }}>
      <div className="w-48 h-60 rounded-[50%_50%_50%_50%_/_65%_65%_35%_35%] iri-egg-dying border-2 border-gray-600 flex flex-col items-center justify-center relative overflow-hidden grayscale contrast-125 brightness-75">
        {/* Crack lines */}
        <div className="absolute top-10 right-10 w-[1px] h-12 bg-black/40 rotate-12 z-0"></div>
        <div className="absolute top-12 right-8 w-[1px] h-6 bg-black/40 -rotate-12 z-0"></div>
        <div className="absolute bottom-16 left-8 w-[1px] h-16 bg-black/40 rotate-45 z-0"></div>
        {/* X eyes */}
        <div className="flex gap-12 mt-[-10px] z-10 opacity-80">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-8 h-1 bg-red-900/60 rounded-full rotate-45 shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute w-8 h-1 bg-red-900/60 rounded-full -rotate-45 shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
          </div>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-8 h-1 bg-red-900/60 rounded-full rotate-45 shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
            <div className="absolute w-8 h-1 bg-red-900/60 rounded-full -rotate-45 shadow-[0_0_5px_rgba(0,0,0,0.5)]"></div>
          </div>
        </div>
        {/* Frown */}
        <div className="w-10 h-8 border-t-2 border-red-900/50 rounded-t-full mt-10 opacity-70"></div>
        {/* Tear line */}
        <div className="absolute top-[55%] right-[42%] w-1 h-4 bg-gray-800 rounded-full opacity-60"></div>
      </div>
      <div className="w-32 h-6 bg-black/40 blur-xl rounded-full mt-6 mx-auto"></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const avgScore = useMemo(() => {
    const scores = messages.filter((m) => m.score !== null).map((m) => m.score!).slice(-5);
    if (scores.length === 0) return 5;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [messages]);

  const state: IriState = getState(avgScore);
  const userMsgCount = messages.filter((m) => m.role === 'user').length;
  const sadness = getSadness(avgScore);
  const trust = getTrust(avgScore, userMsgCount);
  const trustLabel = getTrustLabel(trust);

  // Stats
  const stat1Value = state === 'happy' ? 'MAX!' : state === 'good' ? `${sadness}%` : state === 'sick' ? `${Math.min(sadness + 20, 100)}%` : state === 'dying' ? `${Math.min(sadness + 30, 99)}%` : `${sadness}%`;
  const stat1Bar = state === 'happy' ? 100 : state === 'good' ? Math.max(2, sadness) : state === 'sick' ? Math.min(sadness + 20, 100) : state === 'dying' ? Math.min(sadness + 30, 99) : sadness;

  // Glass class per state
  const glass = state === 'happy' ? 'kawaii-glass-happy' : state === 'good' ? 'kawaii-glass-good' : state === 'neutral' ? 'neutral-glass' : state === 'sick' ? 'kawaii-glass-sick' : 'kawaii-glass-dying';
  const sidebar = `bubbly-sidebar-${state}`;
  const scrollClass = `scrollbar-${state}`;

  const send = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    setSending(true);

    const userMsg: Message = { role: 'user', text, score: null };
    const updated = [...messages, userMsg];
    setMessages(updated);

    niceness(text)
      .then((score) => {
        setMessages((prev) =>
          prev.map((m) => (m === userMsg ? { ...m, score } : m))
        );
      })
      .catch(() => {});

    const history: ChatMsg[] = updated.map((m) => ({ role: m.role, content: m.text }));

    try {
      const reply = await chat(history);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply, score: null }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Try again.', score: null }]);
    }
    setSending(false);
  };

  if (showIntro) {
    return <IntroScreen onEnter={() => setShowIntro(false)} />;
  }

  return (
    <div className={`relative h-screen overflow-hidden flex flex-col ${state === 'dying' ? 'text-gray-300' : 'text-slate-800'}`} style={{ fontFamily: "'Quicksand', sans-serif", transition: 'color 2s ease' }}>

      {/* ── Background crossfade layers ── */}
      {(['happy', 'good', 'neutral', 'sick', 'dying'] as IriState[]).map((s) => (
        <div key={s} className={`bg-layer bg-layer-${s}`} style={{ opacity: state === s ? 1 : 0 }} />
      ))}

      {/* ── Petals overlay (happy only) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: state === 'happy' ? 1 : 0, transition: 'opacity 2s ease' }}>
        <div className="petal w-4 h-4 left-[10%] bg-kawaii-pink/40"></div>
        <div className="petal w-3 h-3 left-[20%] bg-joy-gold/40" style={{ animationDelay: '2s', animationDuration: '12s' }}></div>
        <div className="petal w-5 h-5 left-[50%] bg-dreamy-blue/40" style={{ animationDelay: '4s', animationDuration: '8s' }}></div>
        <div className="petal w-4 h-4 left-[80%] bg-kawaii-hot/40" style={{ animationDelay: '1s', animationDuration: '15s' }}></div>
        <div className="petal w-6 h-6 left-[90%] bg-rainbow-yellow/40" style={{ animationDelay: '3s', animationDuration: '10s' }}></div>
        <div className="absolute inset-0 sparkle-bg"></div>
      </div>

      {/* ═══════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════ */}
      <header className={`relative flex h-20 shrink-0 items-center justify-between px-10 backdrop-blur-lg z-20 t-2 ${
        state === 'happy' ? 'bg-white/50 border-b-4 border-kawaii-hot/30 shadow-[0_4px_30px_rgba(255,105,180,0.2)]'
        : state === 'good' ? 'bg-white/50 border-b-4 border-sunny-gold/30'
        : state === 'neutral' ? 'bg-white/50 border-b border-white/60'
        : state === 'sick' ? 'bg-white/30 border-b-4 border-sick-lime/30'
        : 'bg-sad-dark/40 border-b border-white/5'
      }`}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            {/* Header icon */}
            <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
              state === 'happy' ? 'bg-gradient-to-tr from-kawaii-hot to-joy-gold text-white shadow-[0_0_15px_rgba(255,20,147,0.5)] animate-pulse'
              : state === 'good' ? 'bg-sunny-gold text-white shadow-lg border-2 border-white'
              : state === 'neutral' ? 'bg-iri-accent text-white shadow-md'
              : state === 'sick' ? 'bg-sick-lime text-white shadow-lg'
              : 'bg-dying-gray text-pale-red shadow-lg border border-pale-red/30'
            }`}>
              <span className="material-symbols-outlined text-2xl">
                {state === 'happy' ? 'favorite' : state === 'good' ? 'wb_sunny' : state === 'neutral' ? 'eco' : state === 'sick' ? 'pest_control' : 'sentiment_very_dissatisfied'}
              </span>
            </div>
            {/* Title */}
            <h1 className={`font-display text-2xl whitespace-nowrap ${
              state === 'happy' ? 'text-3xl text-transparent bg-clip-text bg-gradient-to-r from-kawaii-hot via-joy-gold to-dreamy-blue drop-shadow-sm'
              : state === 'good' ? 'text-kawaii-hot'
              : state === 'neutral' ? 'text-slate-700'
              : state === 'sick' ? 'text-sick-text'
              : 'text-gray-300 opacity-80'
            }`}>
              Irigotchi Experience{' '}
              <span className={`ml-2 text-lg font-body ${
                state === 'happy' ? 'text-kawaii-hot'
                : state === 'good' ? 'text-bloom-orange'
                : state === 'neutral' ? 'text-iri-accent'
                : state === 'sick' ? 'text-sick-accent'
                : 'text-pale-red tracking-widest animate-pulse'
              }`}>
                {state === 'happy' ? '✨ overjoyed ✨' : state === 'good' ? '✿ blooming ✿' : state === 'neutral' ? '✿ neutral state ✿' : state === 'sick' ? '✿ feeling sour ✿' : '☠ dying state ☠'}
              </span>
            </h1>
          </div>
          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {(state === 'happy' ? [
              { l: 'Workspace', cls: 'text-kawaii-hot font-bold hover:scale-110 transition-transform text-sm drop-shadow-sm' },
              { l: 'Heart History', cls: 'text-slate-600 font-bold hover:text-kawaii-hot transition-colors text-sm' },
              { l: 'Petals', cls: 'text-slate-600 font-bold hover:text-kawaii-hot transition-colors text-sm' },
              { l: 'Settings', cls: 'text-slate-600 font-bold hover:text-kawaii-hot transition-colors text-sm' },
            ] : state === 'good' ? [
              { l: 'Workspace', cls: 'text-kawaii-hot font-bold hover:opacity-70 transition-opacity text-sm border-b-2 border-kawaii-hot' },
              { l: 'Heart History', cls: 'text-slate-500 font-bold hover:text-kawaii-hot transition-colors text-sm' },
              { l: 'Petals', cls: 'text-slate-500 font-bold hover:text-kawaii-hot transition-colors text-sm' },
              { l: 'Settings', cls: 'text-slate-500 font-bold hover:text-kawaii-hot transition-colors text-sm' },
            ] : state === 'neutral' ? [
              { l: 'Workspace', cls: 'text-slate-700 font-bold hover:text-iri-accent transition-colors text-sm border-b-2 border-iri-accent pb-0.5' },
              { l: 'Heart History', cls: 'text-slate-500 font-bold hover:text-iri-accent transition-colors text-sm' },
              { l: 'Petals', cls: 'text-slate-500 font-bold hover:text-iri-accent transition-colors text-sm' },
              { l: 'Settings', cls: 'text-slate-500 font-bold hover:text-iri-accent transition-colors text-sm' },
            ] : state === 'sick' ? [
              { l: 'Workspace', cls: 'text-sick-text font-bold hover:opacity-70 transition-opacity text-sm' },
              { l: 'Heart History', cls: 'text-slate-500 font-bold hover:text-sick-lime transition-colors text-sm' },
              { l: 'Petals', cls: 'text-slate-500 font-bold hover:text-sick-lime transition-colors text-sm' },
              { l: 'Settings', cls: 'text-slate-500 font-bold hover:text-sick-lime transition-colors text-sm' },
            ] : [
              { l: 'Workspace', cls: 'text-gray-400 font-bold hover:text-white transition-colors text-sm' },
              { l: 'Life Signs', cls: 'text-gray-500 font-bold hover:text-white transition-colors text-sm' },
              { l: 'Wilted Petals', cls: 'text-gray-500 font-bold hover:text-white transition-colors text-sm' },
              { l: 'Settings', cls: 'text-gray-500 font-bold hover:text-white transition-colors text-sm' },
            ]).map((n) => (
              <a key={n.l} href="#" className={`${n.cls} whitespace-nowrap`}>{n.l}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative flex items-center">
            <span className={`material-symbols-outlined absolute left-3 pointer-events-none ${
              state === 'happy' ? 'text-kawaii-hot/60' : state === 'good' ? 'text-kawaii-hot/60' : state === 'neutral' ? 'text-slate-400' : state === 'sick' ? 'text-sick-lime' : 'text-gray-500'
            }`}>search</span>
            <input readOnly className={`w-64 rounded-full py-2 pl-10 pr-4 text-sm outline-none ${
              state === 'happy' ? 'bg-white/70 border-2 border-kawaii-hot/30 placeholder:text-slate-400 shadow-sm'
              : state === 'good' ? 'bg-white/70 border-2 border-sunny-gold/40 placeholder:text-slate-400'
              : state === 'neutral' ? 'bg-white/70 border border-white/60 placeholder:text-slate-400 shadow-sm'
              : state === 'sick' ? 'bg-white/60 border-2 border-sick-lime/30 placeholder:text-slate-400'
              : 'bg-black/20 border border-gray-600 placeholder:text-gray-600 text-gray-300'
            }`} placeholder={
              state === 'happy' ? 'Search magical memories...' : state === 'good' ? 'Search happy memories...' : state === 'neutral' ? 'Search tasks...' : state === 'sick' ? 'Search corrupted memories...' : 'Search fading memories...'
            } type="text" />
          </div>
          {/* Notification */}
          <button className={`kawaii-button size-10 flex items-center justify-center rounded-full shrink-0 ${
            state === 'happy' ? 'bg-kawaii-soft border-2 border-kawaii-hot text-kawaii-hot shadow-lg'
            : state === 'good' ? 'bg-sunny-light border-2 border-sunny-gold text-bloom-orange'
            : state === 'neutral' ? 'bg-white border border-white text-iri-accent shadow-sm hover:shadow-md'
            : state === 'sick' ? 'bg-sick-pale border-2 border-sick-lime text-sick-lime'
            : 'bg-dying-gray/50 border border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white'
          }`}>
            <span className="material-symbols-outlined">
              {state === 'happy' || state === 'good' ? 'notifications_active' : state === 'neutral' ? 'notifications' : 'notifications_paused'}
            </span>
          </button>
          {/* Avatar */}
          <div className={`size-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center ${
            state === 'happy' ? 'border-2 border-joy-gold shadow-[0_0_10px_gold]'
            : state === 'good' ? 'border-2 border-sunny-gold shadow-md'
            : state === 'neutral' ? 'border-2 border-white shadow-md'
            : state === 'sick' ? 'border-2 border-sick-lime shadow-md grayscale opacity-80'
            : 'border border-gray-600 shadow-md grayscale opacity-80'
          }`} style={{ background: state === 'dying' ? '#374151' : '#e2e8f0' }}>
            <span className="material-symbols-outlined" style={{ color: state === 'dying' ? '#6b7280' : '#94a3b8' }}>person</span>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          BODY
          ═══════════════════════════════════════════════ */}
      <div className="relative flex flex-1 overflow-hidden z-10">

        {/* ── SIDEBAR ── */}
        <aside className={`w-72 ${sidebar} flex flex-col p-6 gap-6 z-10 overflow-y-auto custom-scrollbar ${scrollClass}`}>
          <div className="flex flex-col gap-6">
            {/* Mini Iri card */}
            <div className={`${glass} p-4 flex items-center justify-center gap-4 shrink-0 mx-auto w-full max-w-[240px] ${
              state === 'happy' ? 'bg-white/70' : state === 'good' ? 'bg-gradient-to-br from-white/80 to-sunny-light/50' : state === 'dying' ? '!border-gray-700 !shadow-none !bg-black/20' : ''
            }`}>
              <div className={`rounded-full flex items-center justify-center relative overflow-hidden shrink-0 ${
                state === 'happy' ? 'size-14 iri-egg-happy border-4 border-white animate-bounce' : 'size-12 border-2 border-white'
              } ${state === 'good' ? 'iri-egg-good' : state === 'neutral' ? 'iri-egg-neutral' : state === 'sick' ? 'iri-egg-sick border-white/50' : state === 'dying' ? 'iri-egg-dying border-gray-500' : ''}`}
              style={state === 'happy' ? { animationDuration: '2s' } : undefined}>
                {state === 'happy' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50"></div>
                    <span className="material-symbols-outlined text-white text-2xl drop-shadow-md z-10" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </>
                )}
                {state === 'neutral' && (
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                  </div>
                )}
                {state === 'sick' && (
                  <div className="flex gap-1 mt-1">
                    <div className="w-1.5 h-0.5 bg-slate-600 rounded-full"></div>
                    <div className="w-1.5 h-0.5 bg-slate-600 rounded-full"></div>
                  </div>
                )}
                {state === 'dying' && (
                  <>
                    <div className="flex gap-2 transform translate-y-1 opacity-60">
                      <div className="w-2 h-0.5 bg-black rotate-45"></div>
                      <div className="w-2 h-0.5 bg-black -rotate-45"></div>
                    </div>
                    <div className="absolute bottom-3 w-3 h-1 border-t border-black rounded-[50%]"></div>
                  </>
                )}
              </div>
              <div className="min-w-0">
                <h3 className={`font-display text-xl truncate ${
                  state === 'happy' ? 'text-2xl bg-clip-text text-transparent bg-gradient-to-r from-kawaii-hot to-purple-500 font-bold'
                  : state === 'good' ? 'text-kawaii-hot'
                  : state === 'neutral' ? 'text-slate-700'
                  : state === 'sick' ? 'text-sick-text'
                  : 'text-gray-400'
                }`}>{state === 'neutral' ? 'Iri' : 'Iri-chan'}</h3>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${
                  state === 'happy' ? 'text-joy-gold font-black drop-shadow-sm'
                  : state === 'good' ? 'text-bloom-orange flex items-center gap-1'
                  : state === 'neutral' ? 'text-iri-accent'
                  : state === 'sick' ? 'text-sick-accent'
                  : 'text-pale-red animate-pulse'
                }`}>
                  {state === 'good' && <span className="material-symbols-outlined text-xs">local_florist</span>}
                  Status: {state === 'happy' ? 'BEAMING' : state === 'good' ? 'Blooming' : state === 'neutral' ? 'Stable' : state === 'sick' ? 'Unwell' : 'Critical'}
                </p>
              </div>
            </div>

            {/* Nav items */}
            <nav className={`flex flex-col gap-3 w-full ${state === 'dying' ? 'opacity-70' : ''}`}>
              {(state === 'happy' ? [
                { icon: 'chat_bubble', label: 'Chat Space', active: true },
                { icon: 'volunteer_activism', label: 'Bonding Level' },
                { icon: 'hotel_class', label: 'Daily Quests' },
                { icon: 'pets', label: 'Pet Iri' },
              ] : state === 'good' ? [
                { icon: 'chat_bubble', label: 'Chat Space', active: true },
                { icon: 'favorite', label: 'Bonding Level', color: 'text-kawaii-pink' },
                { icon: 'star', label: 'Daily Quests', color: 'text-sunny-gold' },
                { icon: 'cruelty_free', label: 'Pet Iri', color: 'text-bloom-orange' },
              ] : state === 'neutral' ? [
                { icon: 'chat_bubble', label: 'Focus Chat', active: true },
                { icon: 'favorite', label: 'Bonding Level' },
                { icon: 'check_circle', label: 'Daily Quests' },
                { icon: 'spa', label: 'Nurture' },
              ] : state === 'sick' ? [
                { icon: 'chat_error', label: 'Chat Space', active: true },
                { icon: 'heart_broken', label: 'Bonding Level' },
                { icon: 'sick', label: 'Daily Meds' },
                { icon: 'healing', label: 'Nurse Iri' },
              ] : [
                { icon: 'chat_error', label: 'Silence', active: true },
                { icon: 'monitor_heart', label: 'Vitals' },
                { icon: 'bedtime', label: 'Final Wishes' },
                { icon: 'healing', label: 'Emergency Care' },
              ]).map((item, i) => (
                <a key={item.label} href="#" className={`flex items-center gap-4 px-6 py-3 rounded-full font-bold text-sm w-full ${
                  item.active ? (
                    state === 'happy' ? 'bg-gradient-to-r from-kawaii-hot to-kawaii-pink text-white shadow-lg shadow-kawaii-hot/40 transform hover:scale-105 transition-transform'
                    : state === 'good' ? 'bg-kawaii-hot text-white shadow-lg shadow-kawaii-hot/30'
                    : state === 'neutral' ? 'bg-iri-accent text-white shadow-md'
                    : state === 'sick' ? 'bg-sick-lime text-white shadow-lg shadow-sick-lime/30'
                    : 'bg-gray-700/50 text-gray-300 border border-gray-600'
                  ) : (
                    state === 'dying' ? 'text-gray-500 hover:bg-white/5 transition-all'
                    : `${(item as any).color ? '' : 'text-slate-600'} hover:bg-white/50 transition-all`
                  )
                }`}>
                  <span className={`material-symbols-outlined shrink-0 text-xl ${!item.active && (item as any).color ? (item as any).color : ''}`}>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom: quote + action */}
          <div className="mt-auto pt-6">
            <div className={`p-5 rounded-[2rem] mb-4 text-center ${
              state === 'happy' ? 'bg-gradient-to-br from-white/60 to-kawaii-soft/60 border-2 border-joy-gold/50 shadow-inner relative overflow-hidden'
              : state === 'good' ? 'bg-white/60 border-2 border-sunny-light'
              : state === 'neutral' ? 'bg-white/40 border border-white'
              : state === 'sick' ? 'bg-white/40 border-2 border-sick-pale'
              : 'bg-black/20 border border-gray-700'
            }`}>
              {state === 'happy' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-50"></div>}
              <p className={`text-sm font-medium italic relative z-10 ${
                state === 'happy' ? 'text-kawaii-hot font-bold'
                : state === 'good' ? 'text-kawaii-hot'
                : state === 'neutral' ? 'text-slate-600'
                : state === 'sick' ? 'text-sick-accent'
                : 'text-gray-500'
              }`}>
                {state === 'happy' ? "\"I'm overflowing with sparkles! Let's create something amazing!\""
                : state === 'good' ? "\"I feel like sunshine today! Let's get things done! ✨\""
                : state === 'neutral' ? "\"Productivity is optimal today.\""
                : state === 'sick' ? "\"Data... tastes... sour...\""
                : "\"...it's getting dark...\""}
              </p>
            </div>
            <button className={`kawaii-button w-full py-4 rounded-full font-display text-xl ${
              state === 'happy' ? 'bg-gradient-to-r from-joy-gold to-orange-300 text-white shadow-[0_0_20px_rgba(255,215,0,0.5)] border-2 border-white/50'
              : state === 'good' ? 'bg-sunny-gold text-white shadow-xl shadow-sunny-gold/30 gold-shimmer'
              : state === 'neutral' ? 'bg-white text-iri-accent border border-iri-accent/20 shadow-sm hover:shadow-md'
              : state === 'sick' ? 'bg-sick-accent text-white shadow-xl shadow-sick-accent/30'
              : 'bg-dying-gray border border-pale-red/50 text-pale-red shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse hover:bg-gray-700 hover:text-red-400 transition-colors relative'
            }`}>
              {state === 'happy' ? 'High Five! 🙌'
              : state === 'good' ? 'Give Treat 🍪'
              : state === 'neutral' ? 'Quick Check-in ✨'
              : state === 'sick' ? 'Sanitize Data 🫧'
              : 'REPAIR SOUL'}
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className={`flex-1 flex overflow-hidden p-6 gap-6 ${
          state === 'happy' ? 'bg-white/10'
          : state === 'good' ? 'bg-white/20'
          : state === 'neutral' ? ''
          : state === 'sick' ? 'bg-white/10'
          : 'bg-black/10'
        }`}>
          {/* ── CHAT PANE ── */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 h-full">
            <div className={`flex-1 ${glass} overflow-hidden flex flex-col h-full ${
              state === 'neutral' ? 'border-white/60 bg-white/40' : ''
            } ${state === 'dying' ? '!border-gray-700/50 !bg-gray-900/30' : ''}`}>
              {/* Messages */}
              <div className={`flex-1 p-8 overflow-y-auto flex flex-col gap-8 custom-scrollbar ${scrollClass}`}>
                {messages.length === 0 && (
                  <div className={`flex items-center justify-center h-full text-sm ${state === 'dying' ? 'text-gray-600' : 'text-slate-400'}`}>
                    Start typing...
                  </div>
                )}

                {messages.map((m, i) =>
                  m.role === 'assistant' ? (
                    /* Iri bubble */
                    <div key={i} className={`flex items-start gap-4 max-w-[85%] pr-4 ${state === 'dying' ? 'opacity-50' : ''}`}>
                      <div className={`size-12 rounded-full shrink-0 border-2 mt-1 ${
                        state === 'happy' ? 'iri-egg-happy border-white shadow-md'
                        : state === 'good' ? 'iri-egg-good border-white'
                        : state === 'neutral' ? 'iri-egg-neutral border-white'
                        : state === 'sick' ? 'iri-egg-sick border-white opacity-90'
                        : 'iri-egg-dying border-gray-600 grayscale'
                      }`}></div>
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-xs font-bold ml-2 ${
                          state === 'happy' ? 'text-kawaii-hot flex items-center gap-1'
                          : state === 'good' ? 'text-kawaii-hot'
                          : state === 'neutral' ? 'text-slate-500'
                          : state === 'sick' ? 'text-sick-text'
                          : 'text-gray-500'
                        }`}>
                          {state === 'neutral' ? 'Iri' : 'Iri-chan'}
                          {state === 'happy' && <span className="material-symbols-outlined text-[10px] text-joy-gold">stars</span>}
                        </span>
                        <div className={`px-6 py-4 rounded-[2rem] rounded-tl-none text-sm leading-relaxed break-words whitespace-pre-wrap ${
                          state === 'happy' ? 'bg-gradient-to-br from-white/90 to-kawaii-soft/90 text-slate-800 shadow-md border border-kawaii-hot/20'
                          : state === 'good' ? 'bg-white/80 text-slate-700 shadow-sm border border-kawaii-pink/10'
                          : state === 'neutral' ? 'bg-white/90 text-slate-700 shadow-sm border border-slate-100'
                          : state === 'sick' ? 'bg-white/80 text-slate-700 shadow-sm border border-sick-lime/10'
                          : 'bg-gray-800/80 text-gray-400 shadow-sm border border-gray-700'
                        }`}>
                          {m.text}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* User bubble */
                    <div key={i} className="flex flex-col items-end gap-1.5 self-end max-w-[85%] pl-4">
                      <span className={`text-xs font-bold mr-2 ${state === 'dying' ? 'text-gray-600' : 'text-slate-500'}`}>You</span>
                      <div className={`px-6 py-4 rounded-[2rem] rounded-tr-none text-sm leading-relaxed break-words text-left whitespace-pre-wrap ${
                        state === 'happy' ? 'bg-gradient-to-r from-kawaii-hot to-purple-400 text-white shadow-lg border-2 border-white/30'
                        : state === 'good' ? 'bg-kawaii-hot text-white shadow-md'
                        : state === 'neutral' ? 'bg-iri-accent/90 text-white shadow-sm'
                        : state === 'sick' ? 'bg-sick-lime text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 shadow-md border border-gray-600'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  )
                )}

                {sending && (
                  <div className="flex items-start gap-4 max-w-[85%] pr-4 opacity-60">
                    <div className={`size-12 rounded-full shrink-0 border-2 mt-1 animate-pulse ${
                      state === 'happy' ? 'iri-egg-happy border-white' : state === 'good' ? 'iri-egg-good border-white' : state === 'neutral' ? 'iri-egg-neutral border-white' : state === 'sick' ? 'iri-egg-sick border-white' : 'iri-egg-dying border-gray-600'
                    }`}></div>
                    <div className="flex flex-col gap-1.5">
                      <span className={`text-xs font-bold ml-2 ${state === 'happy' || state === 'good' ? 'text-kawaii-hot' : state === 'neutral' ? 'text-slate-500' : state === 'sick' ? 'text-sick-text' : 'text-gray-500'}`}>
                        {state === 'neutral' ? 'Iri' : 'Iri-chan'}
                      </span>
                      <div className={`px-6 py-4 rounded-[2rem] rounded-tl-none text-sm ${
                        state === 'dying' ? 'bg-gray-800/80 text-gray-500 border border-gray-700' : 'bg-white/80 text-slate-400 border border-slate-100'
                      }`}>...</div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div className={`p-6 ${
                state === 'happy' ? 'bg-white/40 border-t-2 border-kawaii-hot/20'
                : state === 'good' ? 'bg-white/40 border-t-2 border-sunny-light'
                : state === 'neutral' ? 'bg-white/30 border-t border-white/50'
                : state === 'sick' ? 'bg-white/30 border-t-2 border-sick-lime/20'
                : 'bg-black/20 border-t border-gray-700/50'
              }`}>
                <div className="relative flex items-center gap-3">
                  <button className={`size-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${
                    state === 'happy' ? 'text-kawaii-hot hover:bg-white/80 hover:scale-110 bg-white/50 shadow-sm size-12'
                    : state === 'good' ? 'text-kawaii-hot hover:bg-kawaii-soft/50'
                    : state === 'neutral' ? 'text-slate-400 hover:text-iri-accent hover:bg-white/50'
                    : state === 'sick' ? 'text-sick-lime hover:bg-sick-pale'
                    : 'text-gray-500 hover:bg-gray-700/30'
                  }`}>
                    <span className={`material-symbols-outlined ${state === 'happy' ? 'text-3xl' : 'text-2xl'}`}>
                      {state === 'sick' ? 'medication' : 'add_circle'}
                    </span>
                  </button>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    className={`w-full rounded-full py-3 px-6 text-sm transition-all shadow-inner outline-none ${
                      state === 'happy' ? 'bg-white/80 border-2 border-kawaii-hot/30 text-slate-700 placeholder:text-slate-400 py-4 font-medium'
                      : state === 'good' ? 'bg-white border-2 border-kawaii-soft text-slate-700 placeholder:text-slate-300'
                      : state === 'neutral' ? 'bg-white/80 border border-white text-slate-700 placeholder:text-slate-400'
                      : state === 'sick' ? 'bg-white border-2 border-sick-pale text-slate-700 placeholder:text-slate-300'
                      : 'bg-gray-900/50 border border-gray-700 text-gray-300 placeholder:text-gray-600'
                    }`}
                    placeholder={
                      state === 'happy' ? 'Share your joy... (｡♥‿♥｡)' : state === 'good' ? 'Share your joy... (｡♥‿♥｡)' : state === 'neutral' ? 'Type your message...' : state === 'sick' ? 'Type a healing command...' : "Say something before it's too late..."
                    }
                    type="text"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || sending}
                    className={`h-10 rounded-full font-bold shadow-lg flex items-center justify-center shrink-0 transition-colors ${
                      state === 'happy' ? 'bg-gradient-to-r from-kawaii-hot to-purple-500 text-white w-20 h-12 hover:shadow-xl hover:scale-105 border-2 border-white/20'
                      : state === 'good' ? 'bg-kawaii-hot text-white w-16 hover:bg-kawaii-pink'
                      : state === 'neutral' ? 'bg-iri-accent text-white w-16 shadow-md hover:bg-iri-accent/90'
                      : state === 'sick' ? 'bg-sick-lime text-white w-16 hover:bg-sick-accent'
                      : 'bg-gray-700 text-gray-400 w-16 hover:bg-gray-600 hover:text-white border border-gray-600'
                    }`}
                  >
                    <span className={`material-symbols-outlined ${state === 'happy' ? 'text-2xl' : 'text-lg'}`}>send</span>
                  </button>
                </div>
                {/* Status bar */}
                <div className="mt-4 flex justify-between items-center px-4">
                  <div className="flex gap-6">
                    {state === 'happy' && (
                      <>
                        <span className="text-[10px] text-kawaii-hot font-black flex items-center gap-1.5 uppercase tracking-widest drop-shadow-sm">
                          <span className="material-symbols-outlined text-sm">sentiment_very_satisfied</span> Vibes: Immaculate
                        </span>
                        <span className="text-[10px] text-purple-500 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">auto_awesome</span> Sparkle Mode Active
                        </span>
                      </>
                    )}
                    {state === 'good' && (
                      <>
                        <span className="text-[10px] text-green-500 font-black flex items-center gap-1.5 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">sentiment_satisfied</span> Positive Vibes
                        </span>
                        <span className="text-[10px] text-bloom-orange font-bold flex items-center gap-1.5 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">auto_awesome</span> Iri is glowing
                        </span>
                      </>
                    )}
                    {state === 'sick' && (
                      <>
                        <span className="text-[10px] text-sick-accent font-black flex items-center gap-1.5 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">bug_report</span> Glitches Detected
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">wifi_off</span> Weak Connection
                        </span>
                      </>
                    )}
                    {state === 'dying' && (
                      <span className="text-[10px] text-pale-red font-black flex items-center gap-1.5 uppercase tracking-widest animate-pulse">
                        <span className="material-symbols-outlined text-sm">warning</span> Vital Signs Failing
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${state === 'dying' ? 'text-gray-600' : 'text-slate-500'}`}>
                    {state === 'happy' ? 'Press Enter to Shine'
                    : state === 'good' ? 'Press Enter to Send'
                    : state === 'sick' ? 'Press Enter to Heal'
                    : state === 'dying' ? 'Press Enter to Resuscitate'
                    : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── SPRITE + STATS PANE ── */}
          <div className="w-[360px] flex flex-col gap-6 shrink-0 h-full">
            <div className={`${glass} p-8 flex flex-col items-center justify-between relative flex-1 ${
              state === 'happy' ? 'border-white/60 bg-gradient-to-b from-white/40 to-transparent'
              : state === 'good' ? 'border-white/80 bg-gradient-to-b from-white/40 to-sunny-light/20'
              : state === 'neutral' ? 'border-white/80 bg-white/30'
              : state === 'sick' ? 'border-white/60'
              : '!border-pale-red/20 !bg-gray-900/40'
            }`}>
              {/* Badge */}
              <div className={`absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md z-10 flex items-center gap-2 whitespace-nowrap ${
                state === 'happy' ? 'bg-gradient-to-r from-joy-gold to-orange-400 text-white shadow-[0_0_15px_gold] border-2 border-white px-6 py-2'
                : state === 'good' ? 'bg-kawaii-hot text-white'
                : state === 'neutral' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm'
                : state === 'sick' ? 'bg-sick-accent text-white'
                : 'bg-pale-red/20 border border-pale-red/50 text-pale-red shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
              }`}>
                {state === 'happy' && <span className="material-symbols-outlined text-sm">sunny</span>}
                {state === 'good' && <span className="material-symbols-outlined text-sm">award_star</span>}
                {state === 'happy' ? 'PURE BLISS' : state === 'good' ? 'Top Performance' : state === 'neutral' ? 'Optimal State' : state === 'sick' ? 'Infection Alert' : 'FATAL ERROR'}
              </div>

              {/* Egg */}
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <EggSprite state={state} score={avgScore} />
              </div>

              {/* Stats grid */}
              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Stat 1 */}
                  <div className={`${glass} p-4 ${
                    state === 'happy' ? 'border-kawaii-hot/20 bg-white/70 hover:scale-105 transition-transform'
                    : state === 'good' ? 'border-kawaii-pink/20 bg-white/70'
                    : state === 'neutral' ? 'border-white/50 bg-white/40'
                    : state === 'sick' ? 'border-sick-lime/20 bg-white/50'
                    : '!border-gray-700 !bg-black/30'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase block mb-2 ${state === 'dying' ? 'text-gray-500' : 'text-slate-500'}`}>
                      {state === 'happy' ? 'Happiness' : state === 'sick' ? 'Toxicity' : 'Sadness Level'}
                    </span>
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-2xl font-display ${
                        state === 'happy' ? 'text-kawaii-hot drop-shadow-sm'
                        : state === 'good' ? 'text-green-500'
                        : state === 'neutral' ? 'text-slate-700'
                        : state === 'sick' ? 'text-red-400'
                        : 'text-gray-400'
                      }`}>
                        {stat1Value}
                      </span>
                      <span className={`w-8 h-8 flex items-center justify-center rounded-md shrink-0 ${
                        state === 'happy' ? 'text-joy-gold bg-joy-gold/10'
                        : state === 'good' ? 'text-green-500 bg-green-100'
                        : state === 'neutral' ? 'text-emerald-500 bg-emerald-50'
                        : state === 'sick' ? 'text-red-400 bg-red-50'
                        : 'text-pale-red bg-pale-red/10 border border-pale-red/20 animate-pulse'
                      }`}>
                        <span className="material-symbols-outlined text-lg">
                          {state === 'happy' ? 'sentiment_very_satisfied' : state === 'good' ? 'check_circle' : state === 'neutral' ? 'check' : state === 'sick' ? 'warning' : 'crisis_alert'}
                        </span>
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full mt-3 overflow-hidden ${
                      state === 'happy' ? 'bg-kawaii-soft' : state === 'dying' ? 'bg-gray-800' : 'bg-slate-100'
                    }`}>
                      <div className={`h-full rounded-full transition-all duration-700 ${
                        state === 'happy' ? 'bg-gradient-to-r from-kawaii-hot to-joy-gold shadow-[0_0_10px_#ff1493] animate-pulse'
                        : state === 'good' ? 'bg-green-400'
                        : state === 'neutral' ? 'bg-emerald-400'
                        : state === 'sick' ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'
                        : 'bg-gray-500 shadow-[0_0_8px_rgba(107,114,128,0.5)]'
                      }`} style={{ width: `${stat1Bar}%` }}></div>
                    </div>
                  </div>

                  {/* Stat 2 - Trust */}
                  <div className={`${glass} p-4 relative overflow-hidden ${
                    state === 'happy' ? 'border-kawaii-hot/20 bg-white/70 hover:scale-105 transition-transform'
                    : state === 'good' ? 'border-kawaii-pink/20 bg-white/70'
                    : state === 'neutral' ? 'border-white/50 bg-white/40'
                    : state === 'sick' ? 'border-sick-lime/20 bg-white/50'
                    : '!border-pale-red/30 !bg-black/30'
                  }`}>
                    {state === 'dying' && <div className="absolute inset-0 bg-pale-red/5 animate-pulse"></div>}
                    <span className={`text-[10px] font-bold uppercase block mb-2 relative z-10 ${
                      state === 'dying' ? 'text-pale-red' : state === 'neutral' ? 'text-slate-400' : 'text-slate-500'
                    }`}>Trust Meter</span>
                    <div className="flex items-center justify-between relative z-10">
                      <span className={`text-2xl font-display ${
                        state === 'happy' ? 'text-purple-500 drop-shadow-sm'
                        : state === 'good' ? 'text-sunny-gold'
                        : state === 'neutral' ? 'text-iri-accent'
                        : state === 'sick' ? 'text-sick-accent'
                        : 'text-pale-red tracking-tighter'
                      }`}>{trustLabel}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full mt-3 overflow-hidden relative z-10 ${
                      state === 'happy' ? 'bg-kawaii-soft' : state === 'dying' ? 'bg-gray-800' : 'bg-slate-100'
                    }`}>
                      <div className={`h-full rounded-full transition-all duration-700 ${
                        state === 'happy' ? 'bg-gradient-to-r from-purple-400 to-blue-400 shadow-[0_0_10px_#a855f7]'
                        : state === 'good' ? 'bg-sunny-gold shadow-[0_0_8px_#ffd700]'
                        : state === 'neutral' ? 'bg-iri-accent shadow-[0_0_8px_#b39ddb]'
                        : state === 'sick' ? 'bg-sick-accent shadow-[0_0_8px_#afb42b]'
                        : 'bg-pale-red shadow-[0_0_8px_#ef4444] animate-pulse'
                      }`} style={{ width: `${trust}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Mood label */}
                <div className={`w-full ${glass} p-5 text-center flex flex-col justify-center items-center relative overflow-hidden ${
                  state === 'happy' ? 'border-kawaii-hot/20 bg-gradient-to-r from-white/80 to-kawaii-soft/80 group'
                  : state === 'good' ? 'border-kawaii-pink/20 bg-gradient-to-r from-sunny-light/80 to-white/80'
                  : state === 'neutral' ? 'border-white/50 bg-white/40'
                  : state === 'sick' ? 'border-sick-lime/20 bg-white/50'
                  : '!border-gray-700 !bg-black/30'
                }`}>
                  {state === 'happy' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>}
                  <span className={`text-[10px] font-bold uppercase block mb-1 ${state === 'dying' ? 'text-gray-500' : 'text-slate-500'}`}>Current Mood</span>
                  <span className={`text-2xl font-display uppercase italic leading-tight tracking-tight text-center w-full ${
                    state === 'happy' ? 'text-transparent bg-clip-text bg-gradient-to-r from-kawaii-hot to-joy-gold drop-shadow-sm'
                    : state === 'good' ? 'text-kawaii-hot flex items-center justify-center gap-2'
                    : state === 'neutral' ? 'text-slate-700'
                    : state === 'sick' ? 'text-sick-text'
                    : 'text-gray-400 animate-pulse'
                  }`}>
                    {state === 'good' && <span className="material-symbols-outlined text-sunny-gold">wb_sunny</span>}
                    {state === 'happy' ? 'Overjoyed & Loving'
                    : state === 'good' ? 'BLOOMING'
                    : state === 'neutral' ? 'Stable & Chill'
                    : state === 'sick' ? 'Feeling Sour'
                    : 'Fading Away...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
