import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Classes = () => {
  const containerRef = useRef(null);
  
  // Native horizontal scroll setup via Framer Motion transform mapping
  // Using the vertical scroll progress of the container to drive horizontal movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"]);

  const classesList = [
    { name: "HIIT Execution", intensity: "Extreme", duration: "45 Min", color: "bg-red-500", shadow: "shadow-red-500/20" },
    { name: "Reformer Pilates", intensity: "Medium", duration: "60 Min", color: "bg-blue-400", shadow: "shadow-blue-400/20" },
    { name: "Combat & Striking", intensity: "High", duration: "60 Min", color: "bg-orange-500", shadow: "shadow-orange-500/20" },
    { name: "Hypertrophy Labs", intensity: "High", duration: "90 Min", color: "bg-purple-500", shadow: "shadow-purple-500/20" },
    { name: "Active Recovery", intensity: "Low", duration: "30 Min", color: "bg-green-400", shadow: "shadow-green-400/20" },
    { name: "Endurance Ride", intensity: "Extreme", duration: "60 Min", color: "bg-yellow-400", shadow: "shadow-yellow-400/20" },
  ];

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] py-32 md:py-48 overflow-hidden relative min-h-[120vh] flex flex-col justify-center">
      {/* Header Info */}
      <div className="px-6 md:px-12 lg:px-24 mb-16 z-10 relative">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">
          The Regimens
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-medium">
          Curated disciplines to break plateaus, reconstruct your limits, and redefine your physiology.
        </p>
      </div>

      {/* Horizontal Scroll Showcase Wrapper */}
      <div className="w-full relative px-6 md:px-12 lg:px-24">
        <motion.div 
          style={{ x: xTransform }} 
          className="flex gap-6 md:gap-8 w-max"
        >
          {classesList.map((cls, i) => (
            <motion.div 
              key={cls.name}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`w-[320px] md:w-[420px] h-[550px] md:h-[650px] bg-[#151515] border border-white/10 rounded-sm p-8 flex flex-col justify-between relative overflow-hidden group shrink-0 hover:bg-[#1a1a1a] transition-colors duration-500`}
            >
              {/* Glowing Neon Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${cls.color} shadow-[0_0_20px_var(--tw-shadow-color)] ${cls.shadow}`} />
              
              <div className="mt-4">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-8">
                  {cls.name}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest bg-white/5 text-white/90 border border-white/10">
                    {cls.intensity}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest bg-white/5 text-white/90 border border-white/10">
                    {cls.duration}
                  </span>
                </div>
              </div>

              {/* Monolithic Number Graphic Background */}
              <div className="mt-auto relative z-0">
                <div className="w-full h-[250px] bg-[#0c0c0c] border border-white/5 rounded-sm flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-500 overflow-hidden relative">
                  <span className="text-white/10 font-black text-[12rem] tracking-tighter leading-none select-none absolute -bottom-10 -right-4 group-hover:text-white/20 transition-colors duration-500">
                    0{i + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Classes;
