import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <footer className="bg-black pt-32 pb-8 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-between min-h-screen">
      <div className="grid lg:grid-cols-4 gap-16 md:gap-24 z-10 mb-32 w-full max-w-7xl mx-auto">
        {/* Newsletter Column */}
        <div className="lg:col-span-2">
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Join The Vanguard
          </h3>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md font-medium">
            Receive exclusive intelligence on new disciplines, recovery science, and global club expansions. No spam, just performance.
          </p>
          
          <div className="relative max-w-md">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/30 focus:outline-none focus:border-transparent transition-colors font-bold uppercase tracking-widest text-sm"
            />
            {/* Animated Neon Focus Line */}
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: isFocused ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-[2px] bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
            />
            <button className="absolute right-0 bottom-4 text-white font-bold uppercase tracking-widest text-sm hover:text-red-500 transition-colors">
              Submit
            </button>
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm opacity-50">Sanctuaries</h4>
          <ul className="flex flex-col gap-5">
            {["Phive Porto", "Phive Boavista", "Phive Coimbra", "Lisbon HQ (2027)"].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm opacity-50">Connect</h4>
          <ul className="flex flex-col gap-5">
            {["Instagram", "Twitter / X", "YouTube", "Spotify"].map(link => (
              <li key={link}>
                <a href="#" className="group relative inline-block text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
                  {link}
                  {/* Animated Underline */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Massive Background Typography */}
      <div className="relative w-full mt-auto flex items-end justify-center overflow-hidden h-[30vh] md:h-[40vh] select-none pointer-events-none">
        <h1 
          className="text-[25vw] md:text-[20vw] leading-[0.75] font-black uppercase tracking-tighter text-transparent absolute -bottom-4 md:-bottom-12" 
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
        >
          PHIVE
        </h1>
        {/* Secondary subtle layer to enhance the graphic effect */}
        <h1 
          className="text-[25vw] md:text-[20vw] leading-[0.75] font-black uppercase tracking-tighter text-white/[0.01] absolute -bottom-4 md:-bottom-12 blur-sm" 
        >
          PHIVE
        </h1>
      </div>

      {/* Footer Bottom Metadata */}
      <div className="flex flex-col md:flex-row justify-between items-center text-white/30 text-[10px] md:text-xs font-bold uppercase tracking-widest border-t border-white/5 pt-8 z-10 mt-16 w-full px-6 md:px-12 lg:px-24 absolute bottom-8 left-0">
        <p>© {new Date().getFullYear()} Phive Athletic Club. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Architecture</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
