
import React, { useRef, useState, useEffect } from 'react';

const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);

  const forcePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setIsError(false);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Playback failed:", err);
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    const handleAction = (e: any) => {
      if (e.detail?.type === 'PLAY_VIDEO') {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(forcePlay, 800); // Wait for scroll to finish
      }
    };

    window.addEventListener('synergy-action' as any, handleAction);
    
    // Initial attempt to play
    forcePlay();

    return () => window.removeEventListener('synergy-action' as any, handleAction);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) forcePlay();
    else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100/30 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-brand-600/10 rounded-[3.5rem] blur-2xl -z-10"></div>
            
            <div 
              className="relative aspect-video rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-slate-900 group cursor-pointer" 
              onClick={togglePlay}
            >
              <video 
                ref={videoRef}
                autoPlay loop muted playsInline
                disablePictureInPicture
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                poster="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
              >
                <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=7b031405a10996c58908f237f37f374945d4e1d1&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
              </video>

              <div className={`absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent flex flex-col justify-end p-8 lg:p-12 transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">Insight Reel</div>
                </div>
                <h3 className="text-white text-2xl lg:text-3xl font-display font-black leading-tight">Accelerating the <br />Future of CDI</h3>
              </div>

              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying ? 'scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100' : 'scale-110 opacity-100'}`}>
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-2xl`}></i>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
              <span className="text-brand-600 text-[10px] font-black uppercase tracking-widest">Industry Evolution</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-black text-slate-900 mb-8 leading-[1.1]">A Quiet <span className="text-brand-600">Revolution</span> in Healthcare.</h2>
            <p className="text-slate-600 text-lg lg:text-xl mb-10 leading-relaxed font-medium">Clinical Documentation Improvement is moving from the back office to the heart of patient care. The era of "Accelerated CDI" demands a new level of professional mastery.</p>
            <button className="bg-slate-900 hover:bg-black text-white font-black px-12 py-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 flex items-center gap-4 text-lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})}>Secure Your Future (₹35k)<i className="fa-solid fa-arrow-right-long text-brand-400"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
