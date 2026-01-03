
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import ModelSection from './components/ModelSection';
import MasteryGrid from './components/MasteryGrid';
import FutureSection from './components/FutureSection';
import Methodology from './components/Methodology';
import VideoSection from './components/VideoSection';
import MissionVision from './components/MissionVision';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import EthicsSection from './components/EthicsSection';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import SyllabusModal from './components/SyllabusModal';
import EnrollmentModal from './components/EnrollmentModal';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnrollClick = () => setIsEnrollOpen(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50">
      {/* Background Decor - Airy Pastel Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-indigo-100/50 blur-[100px] rounded-full"></div>
      </div>

      <Header 
        isScrolled={isScrolled} 
        onSyllabusClick={() => setIsSyllabusOpen(true)} 
        onEnrollClick={handleEnrollClick}
      />
      
      <main className="relative z-10">
        <Hero onEnrollClick={handleEnrollClick} />
        <PainPoints onEnrollClick={handleEnrollClick} />
        <MissionVision />
        <ModelSection />
        <MasteryGrid />
        <FutureSection onEnrollClick={handleEnrollClick} />
        <Methodology />
        <VideoSection onEnrollClick={handleEnrollClick} />
        <PricingSection onEnrollClick={handleEnrollClick} />
        <FAQSection />
        <EthicsSection />
      </main>

      <Footer onSyllabusClick={() => setIsSyllabusOpen(true)} />
      
      {/* Sticky CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 flex gap-2">
        <button 
          onClick={handleEnrollClick}
          className="flex-1 bg-brand-600 text-white font-bold py-3 rounded-lg shadow-lg active:scale-95 transition-transform"
        >
          Enroll Now (₹35k)
        </button>
      </div>

      <ChatWidget />
      
      <SyllabusModal 
        isOpen={isSyllabusOpen} 
        onClose={() => setIsSyllabusOpen(false)} 
      />

      <EnrollmentModal 
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
};

export default App;
