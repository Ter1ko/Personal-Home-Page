'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 获取目标元素
    const element = document.querySelector(href);
    if (element) {
      // 计算目标位置
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // 使用 requestAnimationFrame 确保在下一帧执行滚动
      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-alice overflow-hidden">
      <div className="w-full px-4 py-20">
        <motion.div 
          className="relative h-screen flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.h1 
              className="text-[120px] text-gray-800 mb-8 text-center font-fiolex relative z-10"
              style={{ 
                fontFamily: '"Fiolex Girls", cursive',
                fontWeight: 'normal'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Alice
            </motion.h1>

            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full light-animation"
              style={{
                background: 'radial-gradient(circle, rgba(169, 238, 209, 0.25) 0%, rgba(169, 238, 209, 0) 70%)',
                filter: 'blur(50px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <motion.button
            className="px-6 py-3 bg-[#4ECDC4] text-white rounded-[20px] hover:bg-[#45B7AF] transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg mt-8"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn more ✨
          </motion.button>

          <div className="flex space-x-8">
            <Link 
              href="/"
              className="text-gray-600 hover:text-alice-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
            >
              &nbsp;&nbsp;个人主页
            </Link>
            <Link 
              href="/camera-calibration"
              className="text-gray-600 hover:text-alice-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/camera-calibration';
              }}
            >
              &nbsp;&nbsp;相机标定
            </Link>
            <Link 
              href="/mcm-e"
              className="text-gray-600 hover:text-alice-primary transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/mcm-e';
              }}
            >
              &nbsp;&nbsp;美赛E题
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 