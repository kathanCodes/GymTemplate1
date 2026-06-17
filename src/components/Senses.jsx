import React from 'react';
import { motion } from 'framer-motion';

const Senses = () => {
  return (
    <section className="bg-black overflow-hidden py-12 md:py-24 relative z-20">
      {/* Massive Pop-up Reveal Block */}
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-[80vh] bg-[#DFFF00] flex flex-col items-center justify-center w-full px-4 md:px-12 py-24 shadow-[0_0_150px_rgba(223,255,0,0.15)] border-y-[12px] border-[#0a0a0a]"
      >
        <motion.h2 
          initial={{ y: 150, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <span className="text-[16vw] md:text-[11vw] font-black text-black uppercase tracking-tighter leading-[0.8] mb-2 md:mb-0">
            ACTIVATE
          </span>
          <span className="text-[16vw] md:text-[11vw] font-black text-black uppercase tracking-tighter leading-[0.8] mb-4 md:mb-0">
            YOUR SENSES
          </span>
          {/* Outline / Stroke text for visual aggression */}
          <span className="text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-transparent mt-2 md:mt-4" style={{ WebkitTextStroke: "min(6px, 1vw) black" }}>
            PUSH YOUR LIMITS
          </span>
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default Senses;
