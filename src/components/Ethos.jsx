import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import GlitchText from './GlitchText';

/* ─── Word-by-word stagger reveal ─── */
const RevealWords = ({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.18em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ─── Floating stat pill ─── */
const StatPill = ({ value, label, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start gap-1 px-5 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <span className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
    </motion.div>
  );
};

/* ─── Main Ethos Section ─── */
const Ethos = () => {
  const containerRef = useRef(null);

  /* Scroll-driven parallax */
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);

  /* Diagonal gradient reveal */
  const gradientX = useTransform(scrollYProgress, [0.1, 0.6], ['140%', '0%']);

  const containerInView = useInView(containerRef, { once: true, margin: '-100px' });

  /* Scan-line animation for canvas overlay */
  const [scanY, setScanY] = useState(0);
  useEffect(() => {
    let raf;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      setScanY(((ts - start) / 18) % 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Diagonal accent stripe (scroll-driven) ── */}
      <motion.div
        aria-hidden
        style={{ left: gradientX }}
        className="absolute inset-y-0 pointer-events-none z-0"
      >
        <div
          className="h-full w-[2px] opacity-30"
          style={{ background: 'linear-gradient(to bottom, transparent, #dfff00 30%, #00ffff 70%, transparent)' }}
        />
      </motion.div>

      {/* ── Grid noise texture overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ── Main content: Asymmetric layout ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen py-24 md:py-32 gap-0">

        {/* LEFT — Text Column */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 relative">



          <div className="relative z-10">
            {/* Overline label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={containerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-[#dfff00]" />
              <span className="text-[#dfff00] text-xs font-black uppercase tracking-[0.4em]">Our Ethos</span>
            </motion.div>

            {/* Main heading — stagger-reveal words */}
            <motion.div style={{ y: yText }} className="max-w-xl">
              <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.88] uppercase mb-0">
                <div className="text-white/30">
                  <RevealWords text="Elevate" delay={0.2} />
                </div>
                <div className="text-white/50">
                  <RevealWords text="Your" delay={0.3} />
                </div>
                {/* "Baseline." with shared glitch effect */}
                <div className="text-white">
                  <GlitchText text="Baseline." interval={2500} jitter={1500} />
                </div>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={containerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="mt-10 text-lg md:text-xl text-gray-400 font-medium max-w-md leading-relaxed"
              >
                We reject the average. We are an institution built for those who
                demand the pinnacle of performance, recovery, and aesthetic
                perfection.
              </motion.p>
            </motion.div>

            {/* Stat pills row */}
            <div className="mt-12 grid grid-cols-3 gap-3 max-w-md">
              <StatPill value="12K+" label="Members" delay={0.8} />
              <StatPill value="98%" label="Retention" delay={0.9} />
              <StatPill value="5★" label="Rated" delay={1.0} />
            </div>

            {/* Marquee ticker strip */}
            <div className="mt-14 overflow-hidden border-t border-white/5 pt-6">
              <motion.div
                animate={{ x: [0, '-50%'] }}
                transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                className="flex whitespace-nowrap"
              >
                {Array(8).fill('STRENGTH · RECOVERY · PRECISION · ELITE · ').map((t, i) => (
                  <span key={i} className="text-xs font-black uppercase tracking-[0.3em] text-white/15 pr-6">{t}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT — Gym Man with White Haze & Level-Up Particles */}
        <div className="flex items-center justify-center px-4 lg:px-8 relative pt-16 lg:pt-0">

          {/* White Haze emanating outwards */}
          <div aria-hidden className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center mix-blend-screen">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`haze-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 1.6
                }}
                className="absolute w-[80%] h-[80%] rounded-full blur-[80px]"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.36) 0%, transparent 70%)' }}
              />
            ))}
          </div>

          {/* Level-Up Particles (Glowing white spheres rising) */}
          <div aria-hidden className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-screen">
            {Array.from({ length: 8 }).map((_, i) => {
              const startLeft = 25 + Math.random() * 50; // 25% to 75% left
              const endLeft = startLeft + (Math.random() - 0.5) * 15; // subtle drift
              const size = Math.random() * 4 + 2; // much smaller: 2px to 6px
              const duration = 12 + Math.random() * 10; // very slow: 12 to 22 seconds
              const delay = Math.random() * 10;
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ opacity: 0, top: '100%', left: `${startLeft}%` }}
                  animate={{
                    opacity: [0, 0.25, 0.25, 0], // low transparency
                    top: ['100%', '-5%'],
                    left: [`${startLeft}%`, `${endLeft}%`],
                    scale: [0, 1, 0.8]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: 'linear', // linear looks smoother for slow continuous drift
                    delay: delay
                  }}
                  className="absolute rounded-full bg-white/40"
                  style={{
                    width: size,
                    height: size,
                    boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.2)', // subtle glow
                    filter: 'blur(1px)'
                  }}
                />
              );
            })}
          </div>

          {/* Man curling dumbbell wrapper - Clean and Borderless */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={containerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex items-end justify-center"
            style={{ minHeight: '500px' }}
          >
            {/* Real transparent PNG image generated via alpha mapping */}
            <img
              src="/bicep_curl_alpha.png"
              alt="Man Curling Dumbbell"
              className="w-full h-auto max-h-[700px] object-contain object-bottom relative z-10"
              style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom edge razor line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Ethos;
