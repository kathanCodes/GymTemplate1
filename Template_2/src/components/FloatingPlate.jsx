import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FloatingPlate = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // When the fade-out sequence is complete (scroll progress >= 0.35),
    // we set isVisible to false so it is permanently removed from the DOM
    // and won't reappear on scroll back up.
    if (latest >= 0.35 && isVisible) {
      setIsVisible(false);
    }
  });

  // 1. Constrain the Rolling Path & Rotation
  // Continuous rotation based on global scroll depth
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]); 
  
  // Parallax float mapping: starts lower left, floats to upper right.
  // It rolls aggressively across the first few chaotic sections.
  const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "70vw"]);
  const y = useTransform(scrollYProgress, [0, 1], ["70vh", "-30vh"]);

  // 2. Scroll-Linked Fade Out and Scale Down
  // We map the global scroll progress. Assuming Hero + Senses + ClubCollage 
  // take up roughly 30-40% of the massive page height, we trigger the fade 
  // as it approaches Ethos and the text-heavy Classes sections.
  const opacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.25, 0.35], [1, 0.7]);

  if (!isVisible) return null;

  return (
    <motion.div 
      style={{ rotate, x, y, opacity, scale }}
      // Z-Index changed to z-15. 
      // This places it above standard backgrounds (z-0 to z-10) 
      // but strictly below critical text overlays and foreground content (z-20+).
      className="fixed top-1/4 left-10 z-[15] pointer-events-none w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#111] border-[12px] border-[#0a0a0a] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Inner Rim Detail */}
      <div className="absolute inset-1 border border-white/10 rounded-full" />
      <div className="absolute inset-6 border-2 border-dashed border-[#DFFF00]/20 rounded-full" />
      
      {/* Circular Text SVG */}
      <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100">
        <path id="textPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
        <text className="text-[10px] font-black uppercase fill-[#DFFF00] tracking-[0.2em]">
          <textPath href="#textPath" startOffset="0%">
            PHIVE ATHLETIC CLUB • FITNESS STRONG • 
          </textPath>
        </text>
      </svg>

      {/* Central Hub */}
      <div className="w-20 h-20 rounded-full border-[8px] border-[#0a0a0a] bg-[#1a1a1a] flex flex-col items-center justify-center shadow-inner relative">
         <span className="text-white font-black text-2xl leading-none">45</span>
         <span className="text-white/40 font-bold text-[8px] tracking-widest uppercase mt-0.5">LBS</span>
      </div>
    </motion.div>
  );
};

export default FloatingPlate;
