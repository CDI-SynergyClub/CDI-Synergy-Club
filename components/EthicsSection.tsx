
import React from 'react';

const EthicsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 mb-8 border border-brand-100 shadow-sm">
          <i className="fa-solid fa-scale-balanced text-brand-600 text-2xl"></i>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-6">Trust, Ethics & Transparency</h3>
        <p className="text-slate-600 text-base leading-relaxed mb-10 font-medium">
          CDI Synergy Club is an independent training provider. We are not affiliated with, endorsed by, or partnered with AHIMA or any other certifying body. 
          Our mission is strictly educational: to build clinical competence and documentation excellence. We do not guarantee exam success; we guarantee the delivery of a professional system that has consistently empowered serious aspirants to succeed on their own merits.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-6 py-2.5 rounded-full">Independent Provider</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-6 py-2.5 rounded-full">No Shortcuts</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-6 py-2.5 rounded-full">Clinical Focus</span>
        </div>
      </div>
    </section>
  );
};

export default EthicsSection;
