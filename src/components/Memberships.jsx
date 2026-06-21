import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

const Memberships = () => {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    { 
      name: "The Standard", 
      price: billing === 'monthly' ? "€89" : "€890", 
      features: ["Full Access to Club", "Standard Studio Classes", "Locker Room Access", "Basic App Features"], 
      premium: false 
    },
    { 
      name: "The Executive Club", 
      price: billing === 'monthly' ? "€149" : "€1490", 
      features: ["Priority Booking Access", "All Elite & Specialized Classes", "Spa & Recovery Zones", "Dedicated Private Locker", "1x PT Session/mo"], 
      premium: true 
    },
    { 
      name: "The Zenith", 
      price: billing === 'monthly' ? "€299" : "€2990", 
      features: ["Unrestricted Global Access", "Unlimited Personal Training", "Private Recovery Suites", "Custom Nutrition Blueprint", "Valet Parking"], 
      premium: false 
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-32 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
            <GlitchText text="Ascend Your Tier" interval={4500} jitter={2000} />
          </h2>
          
          {/* Framer Motion Toggle Button */}
          <div className="relative flex items-center p-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            {['monthly', 'annual'].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={`relative px-10 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest z-10 transition-colors duration-300 ${billing === type ? 'text-black' : 'text-white/60 hover:text-white'}`}
              >
                {type}
                {billing === type && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {plans.map((plan, idx) => (
            <div 
              key={plan.name} 
              className={`relative rounded-xl p-[2px] transition-all duration-500 ${plan.premium ? 'scale-105 z-20 shadow-[0_0_60px_rgba(239,68,68,0.15)]' : 'scale-100 opacity-90 hover:opacity-100'}`}
            >
              {/* Premium Animated Gradient Border */}
              {plan.premium && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-red-900 rounded-xl animate-gradient-xy opacity-100" />
              )}
              
              {/* Card Internal Content */}
              <div className={`relative h-full rounded-xl p-10 md:p-12 flex flex-col ${plan.premium ? 'bg-[#050505]' : 'bg-[#121212] border border-white/5'}`}>
                {plan.premium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    Most Selected
                  </div>
                )}
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{plan.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-10 border-b border-white/10 pb-10">
                  <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-white/40 font-bold tracking-widest uppercase text-sm">/ {billing === 'monthly' ? 'mo' : 'yr'}</span>
                </div>
                
                <ul className="flex flex-col gap-6 mb-12 flex-1">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-white/80 font-medium">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${plan.premium ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-white/30'}`} />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-5 rounded-full font-black uppercase tracking-widest transition-all duration-300 mt-auto ${plan.premium ? 'bg-white text-black hover:scale-[1.02]' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                  Join The Vanguard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memberships;
