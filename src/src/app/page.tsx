'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import LoadingAnimation from './components/LoadingAnimation';
import Sakura from './components/Sakura';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';

// 修改MenuButton组件
const MenuButton = ({ onClick, type }: { onClick: () => void; type: 'menu' | 'home' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // 初始化值
    setScrollY(window.scrollY);
    setWindowHeight(window.innerHeight);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 如果是主页，不显示按钮
  if (scrollY < windowHeight) {
    return null;
  }

  // 如果是导航页面，显示Home按钮
  if (scrollY >= windowHeight && scrollY < windowHeight * 2) {
    return type === 'home' ? (
      <motion.button
        className="fixed top-8 right-8 z-[100] glass-effect rounded-full px-8 py-4 text-alice-primary hover:scale-105 transition-transform duration-300 font-fiolex"
        style={{ 
          fontFamily: '"Fiolex Girls", cursive',
          fontWeight: 'normal',
          fontSize: '24px',
          position: 'fixed',
          top: '2rem',
          right: '2rem'
        }}
        onClick={onClick}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        Home
      </motion.button>
    ) : null;
  }

  // 如果是其他页面，显示Menu按钮
  return type === 'menu' ? (
    <motion.button
      className="fixed top-8 right-8 z-[100] glass-effect rounded-full px-8 py-4 text-alice-primary hover:scale-105 transition-transform duration-300 font-fiolex"
      style={{ 
        fontFamily: '"Fiolex Girls", cursive',
        fontWeight: 'normal',
        fontSize: '24px',
        position: 'fixed',
        top: '2rem',
        right: '2rem'
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      Menu
    </motion.button>
  ) : null;
};

export default function Home() {
  // 1. 所有useState调用
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // 2. 所有useMotionValue调用
  const backgroundX = useMotionValue(0);
  const backgroundY = useMotionValue(0);

  // 3. 所有useTransform调用
  const backgroundXTransform = useTransform(backgroundX, [-10, 10], [40, 60]);
  const backgroundYTransform = useTransform(backgroundY, [-10, 10], [40, 60]);

  // 4. 所有useMemo调用
  const sakuras = useMemo(() => {
    if (!isMounted) return [];
    
    const numSakuras = 25;
    const durationRange = 8;
    
    return Array.from({ length: numSakuras }, (_, i) => ({
      id: i,
      initialX: (windowSize.width / numSakuras) * i,
      initialY: -20 - (Math.random() * 100),
      size: Math.random() * 15 + 8,
      delay: Math.random() * 8,
      duration: durationRange + Math.random() * 2,
    }));
  }, [windowSize.width, isMounted]);

  // 5. 所有useEffect调用
  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const moveBackground = () => {
      const xOffset = (mousePosition.x / windowSize.width - 0.5) * 20;
      const yOffset = (mousePosition.y / windowSize.height - 0.5) * 20;
      backgroundX.set(xOffset);
      backgroundY.set(yOffset);
    };

    moveBackground();
  }, [mousePosition, windowSize, backgroundX, backgroundY, isMounted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 添加导航处理函数
  const handleNavigation = (targetSection: string) => {
    if (isScrolling || typeof window === 'undefined') return;
    
    setIsScrolling(true);
    const section = document.querySelector(targetSection);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // 6. 事件处理函数
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // 添加动态光效处理
  const renderDynamicLight = () => {
    if (!isMounted) return null;
    
    return (
      <motion.div
        className="absolute w-[800px] h-[800px] opacity-5"
        style={{
          background: `radial-gradient(circle at ${backgroundXTransform}% ${backgroundYTransform}%, #52bdfe 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  };

  // 确保在服务器端渲染时返回null
  if (typeof window === 'undefined') {
    return null;
  }

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingAnimation onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-alice overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 左侧装饰线条 */}
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        
        {/* 右侧装饰线条 */}
        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        
        {/* 装饰圆点 */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-white/20"></div>
        <div className="absolute top-[40%] right-[15%] w-2 h-2 rounded-full bg-white/20"></div>
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 rounded-full bg-white/20"></div>
        <div className="absolute bottom-[20%] right-[25%] w-2 h-2 rounded-full bg-white/20"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10">
        <div className="w-full px-4 py-20">
          <AnimatePresence>
            {isLoading ? (
              <LoadingAnimation onLoadingComplete={handleLoadingComplete} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full"
              >
                {/* 主页面 */}
                <section className="h-screen bg-main relative z-0">
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 overflow-hidden z-0">
                    {renderDynamicLight()}
                  </div>

                  {/* 主要内容 */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center flex flex-col items-center justify-center"
                    >
                      <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {/* 圆环容器 */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          {/* 外部圆环 */}
                          <motion.div
                            className="absolute w-[660px] h-[660px] rounded-full"
                            style={{ 
                              background: 'radial-gradient(circle at center, rgba(82, 189, 254, 0.1) 0%, transparent 70%)',
                              border: '2px solid #52bdfe',
                              opacity: 0.15,
                              boxShadow: '0 0 50px rgba(82, 189, 254, 0.5), inset 0 0 50px rgba(82, 189, 254, 0.5)'
                            }}
                            animate={{
                              rotate: 360,
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              rotate: {
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                              },
                              scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          />
                          {/* 内部圆环 */}
                          <motion.div
                            className="absolute w-[420px] h-[420px] rounded-full"
                            style={{ 
                              background: 'radial-gradient(circle at center, rgba(73, 210, 199, 0.1) 0%, transparent 70%)',
                              border: '2px solid #49d2c7',
                              opacity: 0.15,
                              boxShadow: '0 0 50px rgba(73, 210, 199, 0.5), inset 0 0 50px rgba(73, 210, 199, 0.5)'
                            }}
                            animate={{
                              rotate: -360,
                              scale: [1.05, 1, 1.05]
                            }}
                            transition={{
                              rotate: {
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                              },
                              scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          />
                        </motion.div>

                        {/* 文字内容 */}
                        <div className="relative z-10">
                          <motion.h1
                            className="text-[140px] text-alice-primary font-fiolex"
                            style={{ 
                              fontFamily: '"Fiolex Girls", cursive',
                              fontWeight: 'normal'
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            Alice
                          </motion.h1>
                          <motion.p
                            className="text-2xl text-alice-secondary mt-8 font-playfair"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            "Live Free, Dream Boundless"
                          </motion.p>
                        </div>
                      </motion.div>

                      <motion.button
                        onClick={() => handleNavigation('section:nth-child(2)')}
                        className="glass-effect rounded-full px-8 py-4 text-2xl text-alice-primary hover:scale-105 transition-transform duration-300 mt-[100px] font-fiolex"
                        style={{ 
                          fontFamily: '"Fiolex Girls", cursive',
                          fontWeight: 'normal',
                          minWidth: '135px',
                          lineHeight: '1.5'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>

                    {/* 樱花 */}
                    {sakuras.map((sakura) => (
                      <Sakura
                        key={sakura.id}
                        initialX={sakura.initialX}
                        initialY={sakura.initialY}
                        size={sakura.size}
                        delay={sakura.delay}
                        duration={sakura.duration}
                      />
                    ))}
                  </div>
                </section>

                {/* 导航页面 */}
                <section className="h-screen bg-gradient-alice relative z-10 flex items-center">
                  <MenuButton onClick={() => handleNavigation('section:nth-child(1)')} type="home" />
                  <div className="w-full pl-[20%]">
                    <motion.div
                      className="flex flex-col space-y-8"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.div
                        className="cursor-pointer relative group w-fit"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleNavigation('section:nth-child(3)')}
                      >
                        <h2 
                          className="text-[100px] font-bold text-alice-primary font-fiolex transition-all duration-300 group-hover:text-alice-secondary leading-[1.8] [color:#A9EED1]"
                          style={{ 
                            fontFamily: '"Fiolex Girls", cursive',
                            fontWeight: 'normal'
                          }}
                        >
                          About Me
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-alice-secondary transition-all duration-300 group-hover:w-full"></div>
                      </motion.div>

                      <motion.div
                        className="cursor-pointer relative group w-fit"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleNavigation('section:nth-child(4)')}
                      >
                        <h2 
                          className="text-[100px] font-bold text-alice-primary font-fiolex transition-all duration-300 group-hover:text-alice-secondary leading-[1.8] [color:#A9EED1]"
                          style={{ 
                            fontFamily: '"Fiolex Girls", cursive',
                            fontWeight: 'normal'
                          }}
                        >
                          Work
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-alice-secondary transition-all duration-300 group-hover:w-full"></div>
                      </motion.div>

                      <motion.div
                        className="cursor-pointer relative group w-fit"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleNavigation('section:nth-child(5)')}
                      >
                        <h2 
                          className="text-[100px] font-bold text-alice-primary font-fiolex transition-all duration-300 group-hover:text-alice-secondary leading-[1.8] [color:#A9EED1]"
                          style={{ 
                            fontFamily: '"Fiolex Girls", cursive',
                            fontWeight: 'normal'
                          }}
                        >
                          Skills
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-alice-secondary transition-all duration-300 group-hover:w-full"></div>
                      </motion.div>

                      <motion.div
                        className="cursor-pointer relative group w-fit"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleNavigation('section:nth-child(6)')}
                      >
                        <h2 
                          className="text-[100px] font-bold text-alice-primary font-fiolex transition-all duration-300 group-hover:text-alice-secondary leading-[1.8] [color:#A9EED1]"
                          style={{ 
                            fontFamily: '"Fiolex Girls", cursive',
                            fontWeight: 'normal'
                          }}
                        >
                          Contact
                        </h2>
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-alice-secondary transition-all duration-300 group-hover:w-full"></div>
                      </motion.div>
                    </motion.div>
                  </div>
                </section>

                {/* About Section */}
                <section className="relative w-full z-10">
                  <div className="relative">
                    <MenuButton onClick={() => handleNavigation('section:nth-child(2)')} type="menu" />
                    <About />
                  </div>
                </section>

                {/* Work Section */}
                <section className="relative w-full z-10 min-h-screen bg-gradient-alice flex items-center justify-center py-20">
                  <div className="relative w-full">
                    <MenuButton onClick={() => handleNavigation('section:nth-child(2)')} type="menu" />
                    <Work />
                  </div>
                </section>

                {/* Skills Section */}
                <section className="relative w-full z-10">
                  <div className="relative">
                    <MenuButton onClick={() => handleNavigation('section:nth-child(2)')} type="menu" />
                    <Skills />
                  </div>
                </section>

                {/* Contact Section */}
                <section className="relative w-full z-10 min-h-screen bg-gradient-alice flex items-center justify-center py-20">
                  <div className="relative w-full">
                    <MenuButton onClick={() => handleNavigation('section:nth-child(2)')} type="menu" />
                    <Contact />
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
