
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Is attendance really tracked?",
      answer: "Yes, 95% attendance is strictly mandatory. Our system is built on discipline. We track login duration and active participation in every live session."
    },
    {
      question: "What if I fail the mock exams?",
      answer: "Failure is part of learning. However, you cannot proceed to final certification phase until you clear our internal benchmarks. We provide Logic Refresher sessions until you master the reasoning."
    },
    {
      question: "Is the course fee refundable?",
      answer: "No. The course fee (₹35,000) represents a commitment. We limit batch sizes to 15; once a seat is blocked, it is dedicated to your transformation."
    },
    {
      question: "Do I need special software for the training?",
      answer: "Only a stable internet connection and browser. We provide access to our proprietary HIPAA-compliant 'Synergy Simulation Lab' for chart reviews."
    },
    {
      question: "Can I join if I'm not a medical coder?",
      answer: "The CDIP is advanced. While coders are the primary audience, clinicians and HIM pros can join provided they pass our entrance assessment."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 bg-slate-50 relative overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-600 font-bold uppercase tracking-widest mb-4">Questions?</p>
          <h2 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-6">
            Frequently Asked <span className="text-brand-600">Questions</span>
          </h2>
          <p className="text-slate-600 font-medium italic">Everything you need to know about the Synergy Club experience.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-[2rem] transition-all duration-300 ${
                activeIndex === index 
                ? 'bg-white border-brand-200 shadow-xl shadow-brand-600/5' 
                : 'bg-white border-slate-200 hover:border-brand-200'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-brand-600' : 'text-slate-900'}`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  activeIndex === index ? 'bg-brand-600 text-white rotate-45' : 'bg-slate-100 text-slate-400'
                }`}>
                  <i className="fa-solid fa-plus text-sm"></i>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
