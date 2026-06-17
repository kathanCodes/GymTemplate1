import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Facilities = () => {
  const facilities = [
    { 
      name: "Free Weights", 
      size: "md:col-span-2 md:row-span-2", 
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      name: "Cardio Studio", 
      size: "md:col-span-1 md:row-span-1", 
      image: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      name: "Recovery & Spa", 
      size: "md:col-span-1 md:row-span-2", 
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
    },
    { 
      name: "Combat Arena", 
      size: "md:col-span-1 md:row-span-1", 
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop" 
    }
  ];

  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
          The Arsenal
        </h2>
        <p className="text-gray-400 mt-6 text-xl md:text-2xl max-w-2xl font-medium">
          World-class zones meticulously engineered for ultimate output and rapid regeneration.
        </p>
      </div>
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[90vh]">
        {facilities.map((fac, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            key={fac.name} 
            className={`group relative overflow-hidden rounded-sm cursor-pointer min-h-[300px] ${fac.size}`}
          >
            {/* Base Image Layer with Grayscale / Brightness reduction */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
              <img 
                src={fac.image} 
                alt={fac.name} 
                className="w-full h-full object-cover grayscale brightness-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-90"
              />
            </div>
            
            {/* Glassmorphism Overlay (Slides up on hover) */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px]">
              <div className="flex justify-between items-end">
                <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight leading-none">
                  {fac.name}
                </h3>
                {/* Arrow icon slides in slightly delayed */}
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <ArrowUpRight size={24} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
