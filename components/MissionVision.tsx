
import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="bg-white border border-slate-200 border-l-8 border-l-cyan-500 p-8 lg:p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-50 rounded-2xl mb-6 border border-cyan-100">
              <i className="fa-solid fa-bullseye text-cyan-600 text-2xl"></i>
            </div>
            <h3 className="text-3xl font-display font-black text-slate-900 mb-6 uppercase tracking-tight">Our Mission</h3>
            <p className="text-slate-700 text-xl leading-relaxed italic font-medium">
              "To build clinical documentation mastery through a high-discipline, instructor-led ecosystem, 
              transforming clinical thinking into verified professional success."
            </p>
            <p className="mt-6 text-slate-500 text-base leading-relaxed font-medium">
              We don't just teach coding; we build the clinical thinkers who protect the integrity of the healthcare record with logic and precision.
            </p>
          </div>

          <div className="bg-white border border-slate-200 border-l-8 border-l-brand-600 p-8 lg:p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-50 rounded-2xl mb-6 border border-brand-100">
              <i className="fa-solid fa-eye text-brand-600 text-2xl"></i>
            </div>
            <h3 className="text-3xl font-display font-black text-slate-900 mb-6 uppercase tracking-tight">Our Vision</h3>
            <p className="text-slate-700 text-xl leading-relaxed italic font-medium">
              "To be the global gold standard for elite CDI training, where every graduate represents the peak of documentation integrity and clinical reasoning."
            </p>
            <p className="mt-6 text-slate-500 text-base leading-relaxed font-medium">
              We envision a future where the CDI professional is the most vital bridge between clinical care and administrative excellence.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;
