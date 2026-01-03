
import React from 'react';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-4 bg-white relative scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 mb-6">Invest in Mastery</h2>
          <div className="inline-block bg-brand-900 text-white text-5xl font-black px-12 py-8 rounded-[2rem] shadow-2xl shadow-brand-900/20">
            ₹35,000 <span className="text-lg font-normal opacity-60">Total Fee</span>
          </div>
          <p className="text-slate-600 mt-8 text-lg font-medium italic">One-time payment. Lifelong professional impact.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>
              Who Should Enroll
            </h3>
            <ul className="space-y-4 text-slate-600 text-sm font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                CDI Professionals looking for credential validation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                Medical Coders (CPC/CCS) ready for clinical roles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                HIM Leaders aiming for audit excellence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">•</span>
                Those who can commit 10 hours a week to study
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-100 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <i className="fa-solid fa-circle-xmark text-red-600"></i>
              Who Should NOT Enroll
            </h3>
            <ul className="space-y-4 text-slate-500 text-sm italic">
              <li>Anyone looking for 'exam dumps' (we don't use them)</li>
              <li>Professionals unable to attend live coaching</li>
              <li>Those expecting a certificate without evaluation</li>
              <li>Anyone unwilling to do the clinical reasoning work</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-slate-400 text-xs font-semibold uppercase tracking-widest">
          <p>* AHIMA Exam Fee is independent of course fee</p>
          <p className="mt-1">* GST applicable as per standard norms</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
