
import React from 'react';

interface PainPointsProps {
  onEnrollClick: () => void;
}

const PainPoints: React.FC<PainPointsProps> = ({ onEnrollClick }) => {
  const pitfalls = [
    {
      icon: "fa-brain",
      color: "text-brand-600",
      bgColor: "bg-brand-50",
      borderColor: "group-hover:border-brand-400",
      title: "Rote Memorization",
      desc: "Trying to memorize guidelines instead of understanding clinical pathophysiology. The exam tests thinking, not recall."
    },
    {
      icon: "fa-calendar-xmark",
      color: "text-coral-600",
      bgColor: "bg-coral-50",
      borderColor: "group-hover:border-coral-400",
      title: "Lack of Accountability",
      desc: "Self-study often loses steam. Without a structured timeline and peer pressure, most aspirants quit by Week 3."
    },
    {
      icon: "fa-file-circle-exclamation",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "group-hover:border-cyan-400",
      title: "Surface-Level Practice",
      desc: "Doing MCQ mocks without deep rationale analysis. You can't clear CDIP just by looking at 'Correct' vs 'Incorrect'."
    }
  ];

  return (
    <section id="why" className="py-24 px-4 bg-white relative overflow-hidden scroll-mt-24">
      {/* Background Decorative Elements to match Hero */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand-100/40 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-100/30 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6">
            <span className="text-slate-600 text-xs font-black uppercase tracking-widest">The Harsh Reality</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 mb-6">
            Why Most CDIP <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-coral-500">Aspirants Fail</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            It's not a lack of intelligence; it's a lack of a clinical system. CDIP requires a fundamental shift in how you process the medical record.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pitfalls.map((item, idx) => (
            <div 
              key={idx} 
              className={`group bg-white border border-slate-200 p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${item.borderColor}`}
            >
              <div className={`w-20 h-20 ${item.bgColor} rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                <i className={`fa-solid ${item.icon} ${item.color} text-4xl`}></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">{item.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className={`text-sm font-bold ${item.color} uppercase tracking-widest`}>Fatal Error #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] blur-2xl opacity-30 -z-10 animate-pulse"></div>
          
          <div className="bg-gradient-to-br from-indigo-700 via-brand-700 to-violet-800 rounded-[3rem] p-10 lg:p-16 text-center text-white shadow-2xl shadow-indigo-900/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-900/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">The Synergy Alternative</h3>
              <p className="text-indigo-50 max-w-3xl mx-auto mb-10 text-xl leading-relaxed font-medium">
                We don't just provide content. We provide a <strong>Disciplined Ecosystem</strong> that forces growth. 
                Our methodology replaces rote memorization with deep clinical logic.
              </p>
              <button 
                onClick={onEnrollClick}
                className="bg-white text-indigo-700 font-black px-12 py-5 rounded-2xl hover:bg-brand-50 shadow-2xl transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Experience the Difference
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
