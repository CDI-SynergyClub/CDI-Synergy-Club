
import React from 'react';

const MasteryGrid: React.FC = () => {
  const areas = [
    {
      title: "Clinical Documentation Judgment",
      desc: "Go beyond 'more codes'. Learn to spot clinical ambiguity and missing diagnoses like a seasoned auditor.",
      value: "Clear complex case-scenarios in the CDIP exam effortlessly.",
      color: "bg-cyan-50",
      iconColor: "text-cyan-600"
    },
    {
      title: "Coding Logic & DRG Thinking",
      desc: "Understand the financial impact of your queries. Master MS-DRG and APR-DRG assignment logic.",
      value: "Elevate your professional value by aligning documentation with revenue integrity.",
      color: "bg-brand-50",
      iconColor: "text-brand-600"
    },
    {
      title: "Quality & Compliance Readiness",
      desc: "Learn the ethics of querying. Prevent leading questions while ensuring absolute record accuracy.",
      value: "Protect your facility and your career from audit risks and compliance pitfalls.",
      color: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      title: "Physician Engagement",
      desc: "The art of the query. Learn how to speak 'Doctor' to get high-quality responses without friction.",
      value: "Become the bridge between medical staff and the administrative team.",
      color: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="mastery" className="py-24 px-4 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-600 font-bold uppercase tracking-widest mb-4">Value Stack</p>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900">
            What You Will <span className="text-brand-600">Actually Master</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {areas.map((area, idx) => (
            <div key={idx} className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className={`w-14 h-14 rounded-2xl ${area.color} flex items-center justify-center mb-6`}>
                <i className={`fa-solid fa-shield text-2xl ${area.iconColor}`}></i>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{area.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed font-medium">{area.desc}</p>
              
              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs font-bold text-brand-600 uppercase mb-2">Professional Impact</p>
                <p className="text-slate-900 text-sm italic font-semibold">" {area.value} "</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasteryGrid;
