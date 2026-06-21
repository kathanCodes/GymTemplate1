import React, { useState, useEffect } from 'react';

/**
 * GlitchText — randomly fires a RGB-split glitch flash on any heading.
 * Usage:  <GlitchText text="The Regimens" className="text-white ..." />
 *
 * interval   – base ms between glitch pulses   (default 3000)
 * jitter     – random extra ms per pulse       (default 2000)
 * duration   – how long the glitch lasts (ms)  (default 160)
 */
const GlitchText = ({ text, className = '', interval = 3000, jitter = 2000, duration = 160, style = {} }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    let handle;
    const schedule = () => {
      handle = setTimeout(() => {
        setGlitch(true);
        setTimeout(() => {
          setGlitch(false);
          schedule(); // re-schedule after reset
        }, duration);
      }, interval + Math.random() * jitter);
    };
    schedule();
    return () => clearTimeout(handle);
  }, [interval, jitter, duration]);

  return (
    <span className={`relative inline-block select-none ${className}`} style={style}>
      {/* Base layer */}
      <span>{text}</span>

      {/* Cyan ghost — only mounted during glitch */}
      {glitch && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            color: '#00ffff',
            clipPath: 'inset(28% 0 42% 0)',
            transform: 'translateX(-5px)',
            mixBlendMode: 'screen',
          }}
        >
          {text}
        </span>
      )}

      {/* Magenta ghost */}
      {glitch && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            color: '#ff00ff',
            clipPath: 'inset(60% 0 4% 0)',
            transform: 'translateX(5px)',
            mixBlendMode: 'screen',
          }}
        >
          {text}
        </span>
      )}

      {/* Yellow ghost — extra slice */}
      {glitch && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            color: '#dfff00',
            clipPath: 'inset(5% 0 80% 0)',
            transform: 'translateX(3px) translateY(-2px)',
            mixBlendMode: 'screen',
            opacity: 0.7,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default GlitchText;
