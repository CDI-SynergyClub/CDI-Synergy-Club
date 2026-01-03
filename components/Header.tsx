
import React from 'react';

interface HeaderProps {
  isScrolled: boolean;
  onSyllabusClick: () => void;
  onEnrollClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, onSyllabusClick, onEnrollClick }) => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-b border-slate-200' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/20">
            <i className="fa-solid fa-bolt text-white text-xl"></i>
          </div>
          <span className="text-2xl font-display font-extrabold tracking-tight text-brand-900 uppercase">
            CDI <span className="text-brand-600">Synergy Club</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#why" 
            onClick={(e) => scrollToSection(e, 'why')}
            className="text-slate-600 hover:text-brand-600 font-semibold transition-colors"
          >
            Why Synergy?
          </a>
          <button 
            onClick={onSyllabusClick}
            className="text-slate-600 hover:text-brand-600 font-semibold transition-colors"
          >
            Curriculum
          </button>
          <a 
            href="#pricing" 
            onClick={(e) => scrollToSection(e, 'pricing')}
            className="text-slate-600 hover:text-brand-600 font-semibold transition-colors"
          >
            Pricing
          </a>
          <button 
            onClick={onEnrollClick}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-brand-600/10 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            Enroll Today
          </button>
        </div>

        <button className="md:hidden text-slate-900 text-2xl">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;
