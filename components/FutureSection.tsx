
import React from 'react';

interface FutureSectionProps {
  onEnrollClick: () => void;
}

const FutureSection: React.FC<FutureSectionProps> = ({ onEnrollClick }) => {
  return (
    <section className="py-24 px-4 bg-slate-50 overflow-hidden relative border-y border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-brand-100 border border-brand-200 px-4 py-1 rounded-full mb-6">
            <span className="text-brand-700 text-xs font-bold uppercase tracking-[0.2em]">Emerging Opportunity 2025–2035</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 mb-6">
            The Future of CDI is <br />
            <span className="text-brand-600">Accelerating.</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            The CDI market is projected to double by 2035—driven by regulatory pressure and clinical complexity. 
            Organizations aren’t just hiring more talent; <span className="text-slate-900 font-extrabold underline decoration-brand-600/30">they’re hiring better-prepared professionals.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Market Explosion Card */}
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                <i className="fa-solid fa-chart-line text-emerald-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900">Market Expansion</h3>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
              <div className="flex-1">
                <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-wider">2025 Valuation</p>
                <div className="text-4xl font-black text-slate-300 line-through">$5.8B</div>
              </div>
              <div className="hidden md:block pb-1">
                <i className="fa-solid fa-arrow-right-long text-slate-300 text-3xl animate-bounce-x"></i>
              </div>
              <div className="flex-1">
                <p className="text-emerald-600 text-sm mb-2 font-black uppercase tracking-wider">2035 Projection</p>
                <div className="text-6xl font-black text-slate-900">$11.7B</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
              <div className="space-y-2">
                <p className="text-emerald-600 font-black flex items-center gap-2 text-sm uppercase">
                  7.2% CAGR
                </p>
                <p className="text-slate-500 text-sm font-semibold">Consistent industry growth over the next decade.</p>
              </div>
              <div className="space-y-2">
                <p className="text-brand-600 font-black flex items-center gap-2 text-sm uppercase">
                  Value-Based Care
                </p>
                <p className="text-slate-500 text-sm font-semibold">Accuracy is now the primary revenue driver.</p>
              </div>
            </div>
          </div>

          {/* Professional Pivot Card - NOW BRIGHT */}
          <div className="bg-white border-4 border-brand-600 rounded-[3rem] p-10 flex flex-col justify-between group shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-brand-600/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                  <i className="fa-solid fa-user-gear text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900">The Strategic Career Pivot</h3>
              </div>
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                For Medical Coders, the move to CDIP isn't just a title change—it's a massive leap in professional authority. 
                Hospitals need professionals who can bridge the gap between clinical medicine and administrative logic.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Move from Rote Coding to Clinical Reasoning",
                  "Command Higher Salaries in Growth Markets",
                  "Become the Bridge between Clinical & Admin",
                  "Future-proof your career against AI automation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-800 font-bold">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
                      <i className="fa-solid fa-check text-[10px] text-emerald-600"></i>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onEnrollClick}
              className="relative z-10 w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              Prepare for the Growth. Join Today.
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
