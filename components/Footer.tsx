
import React from 'react';

interface FooterProps {
  onSyllabusClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSyllabusClick }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <footer className="bg-slate-50 py-16 px-4 border-t border-slate-200 relative z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center">
              <i className="fa-solid fa-bolt text-white text-sm"></i>
            </div>
            <span className="text-xl font-display font-black text-slate-900 uppercase">
              CDI <span className="text-brand-600">Synergy Club</span>
            </span>
          </div>
          <p className="text-slate-500 max-w-sm font-medium">
            The professional standard for CDIP certification training. High-discipline coaching for high-achieving healthcare experts.
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-semibold">
            <li>
              <button 
                onClick={onSyllabusClick} 
                className="hover:text-brand-600 transition-colors text-left"
              >
                Course Syllabus
              </button>
            </li>
            <li><a href="#why" onClick={(e) => scrollToSection(e, 'why')} className="hover:text-brand-600 transition-colors">Study Guide</a></li>
            <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-brand-600 transition-colors">Mock Prep Tips</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-slate-500 text-sm font-semibold">
            <li><i className="fa-solid fa-envelope mr-2 text-brand-600"></i> Info@cdisynergyclub.com</li>
            <li><i className="fa-solid fa-phone mr-2 text-brand-600"></i> +91 89781 13147</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 text-center md:text-left text-slate-400 text-xs font-bold uppercase tracking-wider">
        <p>© {new Date().getFullYear()} CDI Synergy Club. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
