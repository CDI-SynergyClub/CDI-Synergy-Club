
import React, { useState } from 'react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xlgdpelb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          subject: `New Enrollment Request: ${formData.firstName} ${formData.lastName}`,
          ...formData
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to submit. Please check your connection or contact Info@cdisynergyclub.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/20">
              <i className="fa-solid fa-user-plus text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Enrollment Request</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Candidate Registration Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all group active:scale-90">
            <i className="fa-solid fa-xmark text-slate-400 group-hover:text-slate-900"></i>
          </button>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
                <i className="fa-solid fa-check text-emerald-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Application Received</h3>
              <p className="text-slate-600 font-medium mb-8">
                Thank you, <span className="text-brand-600 font-bold">{formData.firstName}</span>. Our admissions lead will contact you shortly at <span className="font-bold">{formData.email}</span> with next steps for the CDIP Sprint.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">First Name</label>
                  <input 
                    required
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="E.g. John"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Last Name</label>
                  <input 
                    required
                    name="lastName"
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="E.g. Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john.doe@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Mobile Number</label>
                <input 
                  required
                  name="mobile"
                  type="tel" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  placeholder="+91 89781 XXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Location (City/State)</label>
                <input 
                  required
                  name="location"
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Hyderabad, Telangana"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-600 transition-colors"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Submitting Protocol...
                    </>
                  ) : (
                    <>
                      Apply for CDIP Training
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <i className="fa-solid fa-lock text-brand-600 text-xs"></i>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Data Secure • Direct Submission to Info@cdisynergyclub.com</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
