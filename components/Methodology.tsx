
import React from 'react';

const Methodology: React.FC = () => {
  const steps = [
    { name: "Concept", icon: "fa-lightbulb", desc: "Core Pathophysiology & Guidelines" },
    { name: "Application", icon: "fa-vial", desc: "Real-world Clinical Chart Review" },
    { name: "Assessment", icon: "fa-clipboard-list", desc: "Rigorous Milestone Exams" },
    { name: "Feedback", icon: "fa-comments", desc: "1-on-1 Trainer Course Correction" }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-8">The Proven Methodology</h2>
        <p className="text-slate-600 text-xl mb-16 italic font-medium">
          "We don't promise outcomes. We build systems that produce outcomes when followed completely."
        </p>

        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-600/0 via-brand-200 to-brand-600/0 -z-10"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center max-w-[200px]">
              <div className="w-20 h-20 bg-white border-2 border-brand-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-brand-600/5 group hover:border-brand-600 transition-all duration-300">
                <i className={`fa-solid ${step.icon} text-brand-600 text-3xl group-hover:scale-110 transition-transform`}></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{step.name}</h4>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
