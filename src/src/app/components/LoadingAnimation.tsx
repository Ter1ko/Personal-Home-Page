'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

const LoadingAnimation = ({ onLoadingComplete }: LoadingAnimationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const letters = ['A', 'l', 'i', 'c', 'e'];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-white z-[9999] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* 背景圆形扩散效果 */}
      {mounted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-[600px] h-[600px] rounded-full border-2 border-[#00cdc0] shadow-[0_0_20px_rgba(0,205,192,0.3)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2],
                opacity: [0, 0.15, 0],
              }}
              transition={{
                duration: 2,
                delay: index * 0.7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      <motion.div 
        className="relative flex items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="relative mx-4"
            variants={letterVariants}
          >
            <motion.div
              className="text-[120px] text-alice-primary relative z-10 font-fiolex"
              style={{ fontFamily: '"Fiolex Girls", cursive' }}
            >
              {letter}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation; 