
import React from 'react';

const Hero: React.FC = () => {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '#pricing');
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        <div className="relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
            <span className="text-brand-600 text-sm font-bold uppercase tracking-wider">Professional CDIP Training</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-display font-black text-slate-900 leading-[1.1] mb-6">
            Where Clinical Thinking Meets<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">
              Documentation Mastery.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Eliminate exam anxiety with a high-discipline system built for Clinical Documentation Mastery. 
            30 days of intense instructor-led coaching that prioritizes logic over memorization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={scrollToPricing}
              className="group relative bg-brand-600 hover:bg-brand-700 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-xl shadow-brand-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Enroll in CDIP Training
              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-lg font-bold px-8 py-4 rounded-xl transition-all">
              Watch Course Overview
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8">
            <div className="flex items-center gap-2 text-slate-500">
              <i className="fa-solid fa-check text-brand-600"></i>
              <span className="text-sm font-semibold">Instructor-Led</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <i className="fa-solid fa-check text-brand-600"></i>
              <span className="text-sm font-semibold">100% Mock Success Target</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <i className="fa-solid fa-check text-brand-600"></i>
              <span className="text-sm font-semibold">Live Simulations</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-brand-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-4 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1200&auto=format&fit=crop" 
              alt="Clear Documentation" 
              className="rounded-[2rem] w-full h-auto object-cover aspect-[4/3]"
            />
            
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-heart-pulse text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-xs text-brand-600 font-bold uppercase tracking-widest">Synergy Pulse</p>
                  <p className="text-slate-900 font-extrabold text-base leading-tight">Data is the lifeblood of healthcare</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
