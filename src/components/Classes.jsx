import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const Classes = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Calculate the total draggable width
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    // Recalculate on resize
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const classesList = [
    { name: "HIIT Execution", intensity: "Extreme", duration: "45 Min", color: "bg-red-500", shadow: "shadow-red-500/20", image: "/class_hiit.png" },
    { name: "Reformer Pilates", intensity: "Medium", duration: "60 Min", color: "bg-blue-400", shadow: "shadow-blue-400/20", image: "/class_pilates.png" },
    { name: "Combat & Striking", intensity: "High", duration: "60 Min", color: "bg-orange-500", shadow: "shadow-orange-500/20", image: "/class_combat.png" },
    { name: "Hypertrophy Labs", intensity: "High", duration: "90 Min", color: "bg-purple-500", shadow: "shadow-purple-500/20", image: "/class_hypertrophy.png" },
    { name: "Active Recovery", intensity: "Low", duration: "30 Min", color: "bg-green-400", shadow: "shadow-green-400/20", image: "/class_recovery.png" },
    { name: "Endurance Ride", intensity: "Extreme", duration: "60 Min", color: "bg-yellow-400", shadow: "shadow-yellow-400/20", image: "/class_endurance.png" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-20 sm:py-32 md:py-48 overflow-hidden relative min-h-[80vh] md:min-h-[100vh] flex flex-col justify-center">
      {/* Header Info */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-10 sm:mb-16 z-10 relative">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-4 sm:mb-6">
          <GlitchText text="The Regimens" interval={3500} jitter={2500} />
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl font-medium">
          Curated disciplines to break plateaus, reconstruct your limits, and redefine your physiology.
        </p>
      </div>

      {/* Draggable Carousel */}
      <motion.div ref={carouselRef} className="w-full relative px-4 sm:px-6 md:px-12 lg:px-24 cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          className="flex gap-4 sm:gap-6 md:gap-8 w-max pb-8 sm:pb-12"
        >
          {classesList.map((cls, i) => (
            <motion.div 
              key={cls.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-[280px] sm:w-[320px] lg:w-[420px] h-[400px] sm:h-[500px] lg:h-[650px] rounded-2xl flex flex-col justify-end relative overflow-hidden group shrink-0 shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={cls.image} 
                  alt={cls.name} 
                  className="w-full h-full object-cover object-center grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:grayscale-0"
                  draggable="false"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glowing Neon Accent Line (Top) */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${cls.color} shadow-[0_0_20px_var(--tw-shadow-color)] ${cls.shadow} opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20`} />
              
              {/* Card Content */}
              <div className="relative z-10 p-6 sm:p-8 transform translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {/* Monolithic Number Graphic */}
                <div className="absolute -top-24 sm:-top-32 right-4 pointer-events-none">
                  <span className="text-white/10 font-black text-[6rem] sm:text-[8rem] tracking-tighter leading-none select-none group-hover:text-white/20 transition-colors duration-500 blur-[2px] group-hover:blur-none">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-4 sm:mb-6 drop-shadow-lg">
                  {cls.name}
                </h3>
                
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                    {cls.intensity}
                  </span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                    {cls.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Classes;
