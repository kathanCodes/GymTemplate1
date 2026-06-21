import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Start the pull-apart animation almost immediately upon page load
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, 100); 
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Configuration for 4 criss-crossing tapes
  const tapes = [
    {
      id: 1,
      rotate: '-rotate-6',
      offsetY: '-translate-y-24',
      quoteLeft: "BREAK YOUR LIMITS",
      quoteRight: "NO EXCUSES",
      delay: 0,
      duration: 1.6 // Slower
    },
    {
      id: 2,
      rotate: 'rotate-[8deg]',
      offsetY: 'translate-y-4',
      quoteLeft: "REDEFINE YOUR PHYSIOLOGY",
      quoteRight: "ELEVATE YOUR BASELINE",
      delay: 0.1,
      duration: 1.5
    },
    {
      id: 3,
      rotate: '-rotate-[12deg]',
      offsetY: 'translate-y-32',
      quoteLeft: "EMBRACE THE GRIND",
      quoteRight: "WE REJECT THE AVERAGE",
      delay: 0.2,
      duration: 1.8
    },
    {
      id: 4,
      rotate: 'rotate-[4deg]',
      offsetY: '-translate-y-48',
      quoteLeft: "PAIN IS WEAKNESS LEAVING",
      quoteRight: "DEMAND PERFECTION",
      delay: 0.05,
      duration: 1.7
    }
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }} // Wait for all tapes to clear
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {/* Tapes Wrapper */}
          <div className="relative w-[200vw] h-full flex items-center justify-center scale-110">
            
            {tapes.map((tape) => (
              <div key={tape.id} className={`absolute w-full h-0 flex items-center justify-center ${tape.rotate} ${tape.offsetY}`}>
                
                {/* Left Half */}
                <motion.div
                  initial={{ x: 0 }}
                  exit={{ x: '-100vw' }}
                  transition={{ duration: tape.duration, ease: [0.76, 0, 0.24, 1], delay: tape.delay }}
                  className="absolute right-1/2 w-[100vw] h-12 md:h-20 shadow-[0_0_50px_rgba(234,179,8,0.2)] z-20"
                  style={{ 
                    background: 'repeating-linear-gradient(45deg, #eab308 0, #eab308 40px, #000000 40px, #000000 80px)',
                    clipPath: 'polygon(0 0, 100% 0, 97% 10%, 100% 30%, 98% 50%, 100% 70%, 96% 90%, 100% 100%, 0 100%)' // jagged tear on right
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
                     <span className="bg-black text-[#eab308] font-black text-xl md:text-3xl tracking-[0.15em] px-4 py-1 italic border-2 border-[#eab308] shadow-lg whitespace-nowrap">
                       {tape.quoteLeft}
                     </span>
                  </div>
                </motion.div>

                {/* Right Half */}
                <motion.div
                  initial={{ x: 0 }}
                  exit={{ x: '100vw' }}
                  transition={{ duration: tape.duration, ease: [0.76, 0, 0.24, 1], delay: tape.delay }}
                  className="absolute left-1/2 w-[100vw] h-12 md:h-20 shadow-[0_0_50px_rgba(234,179,8,0.2)] z-20"
                  style={{ 
                    background: 'repeating-linear-gradient(45deg, #000000 0, #000000 40px, #eab308 40px, #eab308 80px)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 3% 90%, 0 70%, 2% 50%, 0 30%, 4% 10%)' // jagged tear on left
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16">
                     <span className="bg-[#eab308] text-black font-black text-xl md:text-3xl tracking-[0.15em] px-4 py-1 italic border-2 border-black shadow-lg whitespace-nowrap">
                       {tape.quoteRight}
                     </span>
                  </div>
                </motion.div>

              </div>
            ))}
            
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-10 opacity-30" />
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
