'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SakuraProps {
  initialX: number;
  initialY: number;
  size: number;
  delay: number;
  duration: number;
}

const Sakura = ({ initialX, initialY, size, delay, duration }: SakuraProps) => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
      }}
      className="pointer-events-none"
      initial={{ 
        x: initialX,
        y: initialY,
        opacity: 0,
        rotate: 0
      }}
      animate={{ 
        x: initialX + 300, // 增加水平偏移，使移动斜率更大
        y: initialY + windowHeight + 100,
        opacity: [0, 1, 0],
        rotate: 180
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#cdb9ff"
          fillOpacity="0.8"
        />
      </svg>
    </motion.div>
  );
};

export default Sakura; 