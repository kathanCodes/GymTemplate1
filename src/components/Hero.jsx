import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenes = [
  {
    id: 0,
    tapeColor: "#DFFF00", // Neon Yellow
    tapeText: "PHIVE PORTO — ",
    tapeTextClass: "font-black font-sans uppercase tracking-tighter text-black leading-[0.85]",
    tapeStyle: {},
    videoSrc: "https://gym01.com/wp-content/uploads/2023/08/pexels-pavel-danilyuk-6296580-1080p-1.mp4"
  },
  {
    id: 1,
    tapeColor: "#B026FF", // Electric Purple
    tapeText: "NEW LIMITS — ",
    tapeTextClass: "font-serif italic font-black uppercase tracking-wider text-transparent leading-[0.85]",
    tapeStyle: { WebkitTextStroke: "2px white" },
    videoSrc: "https://assets.mixkit.co/active_storage/video_items/100546/1725385655/100546-video-720.mp4"
  },
  {
    id: 2,
    tapeColor: "#00FFFF", // Neon Cyan
    tapeText: "STEP INSIDE — ",
    tapeTextClass: "font-black font-sans uppercase tracking-tighter text-black leading-[0.85]",
    tapeStyle: {},
    // NOTE: Pexels page URLs cannot be used directly in <video src="">. 
    // Please replace with the direct .mp4 link once downloaded/hosted.
    videoSrc: "REPLACE_WITH_DIRECT_MP4_LINK_1" 
  },
  {
    id: 3,
    tapeColor: "#FF007F", // Hot Pink
    tapeText: "KEEP MOVING — ",
    tapeTextClass: "font-serif italic font-black uppercase tracking-wider text-transparent leading-[0.85]",
    tapeStyle: { WebkitTextStroke: "2px white" },
    videoSrc: "REPLACE_WITH_DIRECT_MP4_LINK_2"
  },
  {
    id: 4,
    tapeColor: "#FF5E00", // Blaze Orange
    tapeText: "STAY HYDRATED — ",
    tapeTextClass: "font-black font-sans uppercase tracking-tighter text-black leading-[0.85]",
    tapeStyle: {},
    videoSrc: "REPLACE_WITH_DIRECT_MP4_LINK_3"
  }
];

const Hero = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % scenes.length);
    }, 8000); // 8 seconds per scene
    return () => clearInterval(interval);
  }, []);

  const handleVideoError = (sceneId) => {
    setVideoErrors(prev => ({ ...prev, [sceneId]: true }));
  };

  const currentScene = scenes[sceneIndex];
  
  // Generating a long enough string for infinite scroll
  const marqueeText = Array(12).fill(currentScene.tapeText).join("");

  return (
    <section className="relative w-full h-screen bg-black flex flex-col overflow-hidden">
      
      {/* 1. Top Crime Scene Tape (Collapse & Respawn via AnimatePresence) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`top-tape-${currentScene.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full shrink-0 z-20 shadow-2xl relative border-b-[6px] border-black overflow-hidden flex items-center"
          style={{ backgroundColor: currentScene.tapeColor }}
        >
          {/* Inner Marquee Container */}
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            className="flex whitespace-nowrap pt-2 pb-4"
          >
            <span className={`text-[12vw] pr-4 ${currentScene.tapeTextClass}`} style={currentScene.tapeStyle}>
              {marqueeText}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* 2. Central Energetic Video Container */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center z-10 bg-black">
        {/* Dynamic Scene Video Cross-Fade with Error Fallback */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`video-container-${currentScene.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-zinc-900"
          >
            {videoErrors[currentScene.id] ? (
              // Fallback State
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 border-y border-white/5">
                <svg className="w-8 h-8 text-zinc-700 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <span className="text-zinc-600 font-black uppercase tracking-widest text-xs">Signal Lost</span>
              </div>
            ) : (
              // Active Video
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
                src={currentScene.videoSrc} 
                onError={() => handleVideoError(currentScene.id)}
              />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Intense Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[5] pointer-events-none" />

        {/* 3. Ultra-Minimalist Center Typography */}
        <div className="relative z-[40] flex flex-col items-center text-center px-4 w-full max-w-5xl pointer-events-none">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#DFFF00] font-black uppercase tracking-[0.6em] text-sm md:text-base mb-6 drop-shadow-md"
          >
            Phive Athletic Club
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-[11rem] font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Find Out<br/>More
          </motion.h1>
        </div>
      </div>

      {/* 1. Bottom Crime Scene Tape (Collapse & Respawn via AnimatePresence) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bottom-tape-${currentScene.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full shrink-0 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] relative border-t-[6px] border-black overflow-hidden flex items-center"
          style={{ backgroundColor: currentScene.tapeColor }}
        >
          {/* Inner Marquee Container */}
          <motion.div
            animate={{ x: ["-50%", 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            className="flex whitespace-nowrap pt-4 pb-2"
          >
            <span className={`text-[12vw] pr-4 ${currentScene.tapeTextClass}`} style={currentScene.tapeStyle}>
              {marqueeText}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default Hero;
