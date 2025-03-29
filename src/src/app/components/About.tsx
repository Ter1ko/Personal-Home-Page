'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !isAnimating) {
          setIsAnimating(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isAnimating, isMounted]);

  if (typeof window === 'undefined' || !isMounted) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden bg-gradient-alice flex items-center justify-center py-20"
    >
      {/* 背景装饰 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="absolute inset-0 overflow-hidden z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* 移除动态光效 */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 内容区域 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="relative z-10 w-[750px] mx-auto px-4"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ 
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
              staggerChildren: 0.2
            }}
          >
            <motion.h2 
              className="text-[66px] font-bold text-gray-800 mb-16 text-center hover:text-alice-primary transition-colors duration-300"
              style={{ 
                fontFamily: '"Fiolex Girls", cursive',
                fontWeight: 'normal'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About Me
            </motion.h2>

            <div className="space-y-16">
              <motion.div
                className="glass-effect rounded-[40px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.3,
                  zIndex: 999,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                style={{
                  position: 'relative',
                  transformOrigin: 'center center',
                  marginBottom: '20px'
                }}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative z-10 p-12">
                  <h2 className="text-4xl font-bold text-alice-primary mb-8">个人总结</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    作为一名自动化专业的学生，我具备扎实的编程开发能力。在编程语言方面，我熟练掌握Python（包括OpenCV、NumPy、TensorFlow等库）、C/C++（专注于嵌入式开发）以及MATLAB（用于算法仿真）。在前端开发领域，我能够独立完成网页设计与开发。同时，我对硬件与嵌入式开发流程有深入理解，能够独立完成电路设计工作。
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg mt-6">
                    在技术领域，我掌握了AI与算法相关知识，并具备多媒体技能和审美素养。除了技术能力，我还拥有快速学习与解决问题的能力，善于跨领域协作，并具备良好的技术传播能力。
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-[40px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.3,
                  zIndex: 999,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                style={{
                  position: 'relative',
                  transformOrigin: 'center center',
                  marginBottom: '20px'
                }}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative z-10 p-12">
                  <h2 className="text-4xl font-bold text-alice-primary mb-8">教育经历</h2>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-alice-secondary">中国矿业大学</h3>
                        <p className="text-gray-600 text-lg">自动化专业</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-lg">2022.09 - 2026.06</p>
                        <p className="text-gray-600 text-lg">本科在读（大三）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-[40px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.3,
                  zIndex: 999,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                style={{
                  position: 'relative',
                  transformOrigin: 'center center',
                  marginBottom: '20px'
                }}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative z-10 p-12">
                  <h2 className="text-4xl font-bold text-alice-primary mb-8">就职经历</h2>
                  <p className="text-gray-600 text-lg">暂无</p>
                </div>
              </motion.div>

              <motion.div
                className="glass-effect rounded-[40px] relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.3,
                  zIndex: 999,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                style={{
                  position: 'relative',
                  transformOrigin: 'center center'
                }}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative z-10 p-12">
                  <h2 className="text-4xl font-bold text-alice-primary mb-8">重要奖项</h2>
                  <p className="text-gray-600 text-lg">暂无</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About; 