import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText';

const Clubs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const clubs = [
    { 
      name: "Phive Boavista", 
      location: "Porto Financial District",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      name: "Phive Porto", 
      location: "Riverside Historic Zone",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2075&auto=format&fit=crop" 
    },
    { 
      name: "Phive Coimbra", 
      location: "University Campus Sector",
      image: "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=2070&auto=format&fit=crop" 
    }
  ];

  return (
    <section className="bg-black py-24 md:py-40 px-6 md:px-12 lg:px-24 min-h-screen flex items-center">
      <div className="w-full grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left: Interactive Typography Tabs */}
        <div className="flex flex-col gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              <GlitchText text="The Sanctuaries" interval={4000} jitter={3000} />
            </h2>
            <p className="text-xl text-gray-400 mt-6 font-medium max-w-md">
              Architectural brutalism meets high-performance engineering. Select a location.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            {clubs.map((club, idx) => {
              const isActive = activeTab === idx;
              return (
                <div 
                  key={club.name} 
                  className="group flex flex-col cursor-pointer"
                  onMouseEnter={() => setActiveTab(idx)}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className="flex items-center gap-6">
                    {/* Neon Indicator */}
                    <motion.div 
                      animate={{ height: isActive ? 40 : 0, opacity: isActive ? 1 : 0 }}
                      className="w-1.5 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] shrink-0"
                    />
                    {/* Tab Name & Location Container */}
                    <motion.div
                      animate={{ x: isActive ? 10 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <h3 
                        className={`text-4xl md:text-6xl font-black uppercase tracking-tighter transition-colors duration-500 ${isActive ? "text-white" : "text-white/30 group-hover:text-white/50"}`}
                      >
                        {club.name}
                      </h3>
                      {/* Location Subtext slides down when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-400 uppercase tracking-widest text-sm font-bold mt-2"
                          >
                            {club.location}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Dynamic Cross-Fading Media Container */}
        <div className="w-full h-[600px] md:h-[800px] relative overflow-hidden rounded-sm bg-[#050505]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTab}
              src={clubs[activeTab].image}
              alt={clubs[activeTab].name}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(15px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
            />
          </AnimatePresence>
          {/* Edge gradient for blending */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black opacity-80 lg:opacity-50 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default Clubs;
