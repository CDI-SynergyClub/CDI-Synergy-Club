
import React, { useState } from 'react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [isSending, setIsSending] = useState(false);
  const [isPreparingDownload, setIsPreparingDownload] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const modules = [
    {
      id: 1,
      title: "Clinical Foundations for CDI",
      items: ["Anatomy & physiology essentials for documentation", "Disease processes and clinical indicators", "Diagnosis specificity and clinical evidence"]
    },
    {
      id: 2,
      title: "Documentation Standards & Integrity",
      items: ["Principles of high-quality clinical documentation", "Clinical documentation guidelines", "Documentation gaps and risk identification"]
    },
    {
      id: 3,
      title: "Coding & Reimbursement Logic",
      items: ["ICD-10-CM and ICD-10-PCS overview", "MS-DRG fundamentals and grouping logic", "Severity of Illness (SOI) and Risk of Mortality (ROM)"]
    },
    {
      id: 4,
      title: "Clinical Validation & Query Practice",
      items: ["Clinical validation principles", "Physician query formulation and compliance", "Query scenarios and case-based practice"]
    },
    {
      id: 5,
      title: "Quality, Compliance & Audit Readiness",
      items: ["Quality metrics and documentation impact", "Regulatory compliance fundamentals", "Audit preparedness and documentation defense"]
    },
    {
      id: 6,
      title: "Communication & Professional Judgment",
      items: ["Physician engagement strategies", "Interdisciplinary collaboration", "Professional communication standards"]
    },
    {
      id: 7,
      title: "CDIP Exam Readiness & Mock Testing",
      items: ["Exam blueprint orientation", "Scenario-based mock exams", "Performance analysis and feedback loops"]
    }
  ];

  const triggerDownload = () => {
    setIsPreparingDownload(true);
    // Use a slightly longer timeout to ensure browser paints are complete and to avoid race conditions with window.print()
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.error("Print failed:", err);
      } finally {
        setIsPreparingDownload(false);
      }
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call to save lead and trigger email dispatch
    setTimeout(() => {
      console.log("Lead Captured & Email Sent to:", formData.email);
      setIsSending(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Interactive Modal UI - HIDDEN DURING PRINTING */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:hidden overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300" 
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[2rem] lg:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.4)] flex flex-col transform transition-all duration-300 border border-slate-200">
          
          {/* Header */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
                <i className="fa-solid fa-file-pdf text-white"></i>
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 uppercase tracking-tight">CDIP Syllabus</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Professional Curriculum 2025</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {submitted && (
                <button 
                  onClick={triggerDownload}
                  disabled={isPreparingDownload}
                  className="hidden sm:flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-brand-100 transition-colors border border-brand-200"
                >
                  <i className={`fa-solid ${isPreparingDownload ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                  {isPreparingDownload ? 'Preparing...' : 'Download PDF'}
                </button>
              )}
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all group active:scale-90 border border-transparent hover:border-slate-200"
              >
                <i className="fa-solid fa-xmark text-slate-400 group-hover:text-slate-900 text-xl"></i>
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-10">
            {!showForm ? (
              <>
                <div className="grid md:grid-cols-2 gap-5 mb-10">
                  {modules.map((mod) => (
                    <div key={mod.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:border-brand-300 transition-all hover:shadow-md hover:bg-white group">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="w-10 h-10 bg-white border border-brand-100 text-brand-600 rounded-xl flex items-center justify-center text-sm font-black shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all">M{mod.id}</span>
                        <h3 className="font-bold text-slate-900 leading-tight text-base lg:text-lg">{mod.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {mod.items.map((item, idx) => (
                          <li key={idx} className="flex gap-3 text-xs lg:text-sm text-slate-600 font-medium leading-snug">
                            <span className="text-brand-400 font-black">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 rounded-[2.5rem] p-10 lg:p-14 text-center text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl lg:text-4xl font-black mb-6 leading-tight">Download the Comprehensive <br className="hidden md:block"/> PDF Roadmap</h4>
                    <p className="text-brand-100 mb-10 max-w-2xl mx-auto text-base lg:text-lg font-medium">We'll dispatch the high-res curriculum to your email and provide an instant download link for your records.</p>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="bg-white text-brand-700 px-12 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-4 mx-auto text-lg lg:text-xl group"
                    >
                      <i className="fa-solid fa-cloud-arrow-down group-hover:translate-y-1 transition-transform"></i>
                      Unlock PDF Download
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="max-w-md mx-auto py-4">
                {submitted ? (
                  <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100 shadow-inner">
                      <i className="fa-solid fa-check-double text-emerald-600 text-4xl"></i>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Access Unlocked</h3>
                      <p className="text-slate-500 font-semibold px-4">
                        The full CDIP syllabus is ready for you. We've also sent a copy to <span className="text-brand-600 font-black">{formData.email}</span>.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                      <button 
                        onClick={triggerDownload}
                        disabled={isPreparingDownload}
                        className="w-full bg-brand-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4 text-lg"
                      >
                        <i className={`fa-solid ${isPreparingDownload ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                        {isPreparingDownload ? 'Preparing PDF...' : 'Download Full Syllabus'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Unlock Full Access</h3>
                      <p className="text-slate-500 font-medium">Enter your details to receive the high-resolution PDF syllabus.</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-600 transition-colors"
                          placeholder="Dr. Sarah Mitchell"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Work Email</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-600 transition-colors"
                          placeholder="sarah@hospital.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Mobile Number</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.mobile}
                          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-brand-600 transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-600/20 transition-all flex items-center justify-center gap-3"
                    >
                      {isSending ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Syllabus PDF
                          <i className="fa-solid fa-arrow-right"></i>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                      <i className="fa-solid fa-shield-halved mr-1"></i>
                      Strictly for professional use. No spam.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SyllabusModal;
