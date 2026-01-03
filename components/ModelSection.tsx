
import React from 'react';

const ModelSection: React.FC = () => {
  const rules = [
    { label: "Duration", value: "30 Days", detail: "Focused Sprint" },
    { label: "Attendance", value: "95% Mandatory", detail: "Consistency is Key" },
    { label: "Simulations", value: "100% Completion", detail: "No Mock Left Behind" },
    { label: "Evaluation", value: "Real-time Feedback", detail: "Daily Course Correction" }
  ];

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center hover:bg-brand-50 hover:border-brand-200 transition-all cursor-default group shadow-sm">
                <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mb-2">{rule.label}</p>
                <h4 className="text-2xl font-black text-slate-900 mb-1">{rule.value}</h4>
                <p className="text-slate-500 text-xs font-medium">{rule.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-brand-50 border border-brand-100 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-600 rounded-full flex shrink-0 items-center justify-center shadow-lg shadow-brand-600/20">
              <i className="fa-solid fa-shield-halved text-white"></i>
            </div>
            <div>
              <p className="text-slate-900 font-bold">Why so strict?</p>
              <p className="text-slate-600 text-sm mt-1">Discipline is a professional advantage. CDIs operate in high-stakes environments. We train you for the pressure of the job, not just the exam.</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-6 leading-tight">
            The Discipline-Driven <br />
            <span className="text-brand-600">Training Model</span>
          </h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
            CDI Synergy Club isn't a library of videos. It's a structured path. We believe that professional mastery requires skin in the game.
          </p>
          <ul className="space-y-4">
            {[
              "Instructor-Led Live Sessions (No pre-recorded fluff)",
              "Strict milestones: You don't move forward until you master current module",
              "Small cohort sizes for individual trainer attention",
              "Scenario-based assessments designed by active CDI pros"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700 font-semibold">
                <i className="fa-solid fa-circle-check text-brand-600"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ModelSection;
