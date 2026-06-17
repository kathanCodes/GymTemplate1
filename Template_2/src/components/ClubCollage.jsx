import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", style: { top: '10%', left: '5%', rotate: '-12deg', width: 'clamp(200px, 20vw, 300px)' } },
  { src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop", style: { top: '5%', right: '10%', rotate: '8deg', width: 'clamp(220px, 22vw, 320px)' } },
  { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop", style: { top: '40%', left: '-5%', rotate: '-5deg', width: 'clamp(250px, 25vw, 350px)' } },
  { src: "https://images.unsplash.com/photo-1570829053985-56e661df1ca2?q=80&w=800&auto=format&fit=crop", style: { bottom: '15%', left: '15%', rotate: '15deg', width: 'clamp(200px, 22vw, 280px)' } },
  { src: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop", style: { bottom: '5%', right: '5%', rotate: '-10deg', width: 'clamp(220px, 24vw, 320px)' } },
  { src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop", style: { top: '35%', right: '-5%', rotate: '12deg', width: 'clamp(180px, 20vw, 260px)' } },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop", style: { top: '55%', right: '25%', rotate: '-8deg', width: 'clamp(200px, 22vw, 290px)' } },
  { src: "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?q=80&w=800&auto=format&fit=crop", style: { bottom: '25%', left: '40%', rotate: '6deg', width: 'clamp(220px, 25vw, 310px)' } }
];

const ClubCollage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <section className="bg-black py-32 md:py-48 min-h-screen relative overflow-hidden flex items-center justify-center z-10">
      
      {/* Background Giant Text - Layered above and below based on mix-blend */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-90 mix-blend-difference z-20">
        <h2 className="text-[25vw] md:text-[22vw] text-[#DFFF00] font-black uppercase tracking-tighter leading-none whitespace-nowrap -rotate-[8deg] drop-shadow-[0_0_50px_rgba(223,255,0,0.2)]">
          PHIVE
        </h2>
      </div>

      {/* Pop-up Images Cascade */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="w-full h-screen max-w-[1400px] relative"
      >
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            variants={imageVariants}
            className="absolute rounded-md overflow-hidden border-4 border-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-10 hover:z-30 transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0 cursor-pointer"
            style={img.style}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
            <img src={img.src} alt={`Collage ${idx}`} className="w-full h-full object-cover aspect-[4/3]" />
          </motion.div>
        ))}
      </motion.div>
      
    </section>
  );
};

export default ClubCollage;
