import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Ethos = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation for the text block (moves down as we scroll down)
  const yText = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  
  // Slow scale down for the image
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.2, 1.0]);

  // Opacity transition for the specific keyword "Baseline."
  const keywordOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0.3, 1]);

  return (
    <section ref={containerRef} className="min-h-screen bg-[#0a0a0a] grid lg:grid-cols-2 relative overflow-hidden py-24 md:py-32">
      {/* Left Column: Text Heavy */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
        <motion.div style={{ y: yText }} className="max-w-2xl">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white/50 tracking-tighter leading-[0.9] uppercase">
            Elevate <br/>
            Your <br/>
            <motion.span style={{ color: "rgba(255,255,255,1)", opacity: keywordOpacity }}>
              Baseline.
            </motion.span>
          </h2>
          <p className="mt-10 text-xl md:text-2xl text-gray-400 font-medium max-w-lg leading-snug">
            We reject the average. We are an institution built for those who demand the pinnacle of performance, recovery, and aesthetic perfection.
          </p>
        </motion.div>
      </div>

      {/* Right Column: Media Parallax */}
      <div className="mt-16 lg:mt-0 px-8 lg:px-0 lg:pr-24 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full max-h-[70vh] overflow-hidden rounded-sm relative">
          <motion.img 
            style={{ scale: scaleImage }}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Intense Training" 
            className="w-full h-full object-cover grayscale origin-center"
          />
          {/* Subtle overlay to blend the image into the dark background */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </section>
  );
};

export default Ethos;
