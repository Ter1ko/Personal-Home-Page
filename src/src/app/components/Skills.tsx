'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

const skills: SkillCard[] = [
  {
    id: 1,
    title: "编程语言",
    description: "熟练掌握多种编程语言",
    icon: "💻",
    details: [
      "Python ",
      "C/C++ ",
      "MATLAB ",
      "JavaScript"
    ]
  },
  {
    id: 2,
    title: "前端开发",
    description: "现代前端技术栈",
    icon: "🎨",
    details: [
      "React/Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "响应式设计"
    ]
  },
  {
    id: 3,
    title: "硬件开发",
    description: "嵌入式系统开发",
    icon: "🔧",
    details: [
      "电路设计",
      "PCB制作",
      "单片机开发",
      "传感器应用"
    ]
  },
  {
    id: 4,
    title: "AI与算法",
    description: "人工智能与算法开发",
    icon: "🤖",
    details: [
      "机器学习",
      "计算机视觉",
      "深度学习",
      "算法优化"
    ]
  },
  {
    id: 5,
    title: "多媒体技能",
    description: "创意与设计能力",
    icon: "🎭",
    details: [
      "UI/UX设计",
      "视频制作",
      "图像处理",
      "动画制作"
    ]
  },
  {
    id: 6,
    title: "项目管理",
    description: "团队协作与项目管理",
    icon: "📊",
    details: [
      "项目规划",
      "团队协作",
      "进度管理",
      "文档编写"
    ]
  }
];

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Array<{ id: string; skill: SkillCard; startY: number; isPaused: boolean; isRemoving: boolean }>>([]);
  const lastCardTime = useRef<number>(0);
  const currentSkillIndex = useRef<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // 控制卡片移动速度
  const baseSpeed = 0.5;
  const hoverSpeed = 0.2;
  const currentSpeed = isHovering ? hoverSpeed : baseSpeed;

  // 计算卡片在中心的位置
  const calculateCenterPosition = (cardId: string) => {
    // 只考虑当前实际存在的暂停卡片
    const pausedCards = visibleCards.filter(card => card.isPaused && !card.isRemoving);
    const currentIndex = pausedCards.findIndex(card => card.id === cardId);
    const totalPausedCards = pausedCards.length;
    
    // 计算卡片在中心区域的水平位置
    const centerX = window.innerWidth / 2;
    const cardWidth = 300; // 增加卡片宽度
    const spacing = 400; // 增加放大卡片之间的间距
    const totalWidth = (cardWidth + spacing) * (totalPausedCards - 1);
    const startX = centerX - totalWidth / 2 - 150; // 向左偏移100px
    
    return {
      x: startX + (cardWidth + spacing) * currentIndex,
      y: windowHeight / 2 - 400 // 调整垂直位置，使卡片更居中
    };
  };

  // 处理卡片点击
  const handleCardClick = (cardId: string) => {
    const card = visibleCards.find(c => c.id === cardId);
    if (!card) return;

    if (card.isPaused) {
      // 如果卡片已经暂停，则标记为正在移除
      setVisibleCards(prev => prev.map(c => 
        c.id === cardId ? { ...c, isRemoving: true } : c
      ));

      // 等待动画完成后移除卡片
      setTimeout(() => {
        setVisibleCards(prev => prev.filter(c => c.id !== cardId));
      }, 500);
    } else {
      // 如果卡片未暂停，则暂停它，同时取消其他卡片的暂停状态
      setVisibleCards(prev => prev.map(c => 
        c.id === cardId ? { ...c, isPaused: true } : { ...c, isPaused: false }
      ));
    }
  };

  // 确保代码只在客户端运行
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
    setWindowHeight(window.innerHeight);
    // 延迟初始化，确保在客户端完全加载后
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 每2.2秒添加一张新卡片
  useEffect(() => {
    if (!mounted || !initialized) return;

    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastCardTime.current >= 2200) {
        setVisibleCards(prev => {
          const newCard = {
            id: `${now}`,
            skill: skills[currentSkillIndex.current],
            startY: Math.random() * (500 - 300) + 300,
            isPaused: false,
            isRemoving: false
          };
          currentSkillIndex.current = (currentSkillIndex.current + 1) % skills.length;
          return [...prev, newCard];
        });
        lastCardTime.current = now;
      }
    }, 100);

    return () => clearInterval(timer);
  }, [mounted, initialized]);

  // 清理已经消失的卡片
  useEffect(() => {
    if (!mounted || !initialized) return;

    const cleanupTimer = setInterval(() => {
      setVisibleCards(prev => {
        return prev.map(card => {
          const cardElement = document.getElementById(card.id);
          if (!cardElement) return card;
          const rect = cardElement.getBoundingClientRect();
          if (rect.right <= 0 && !card.isPaused) {
            // 如果卡片已经移出视图且未暂停，触发与点击相同的消失效果
            return { ...card, isRemoving: true };
          }
          return card;
        }).filter(card => !card.isRemoving);
      });
    }, 1000);

    return () => clearInterval(cleanupTimer);
  }, [mounted, initialized]);

  if (!mounted || !initialized) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-alice overflow-hidden">
        <div className="w-full px-4 py-20">
          <h2 className="text-[66px] font-bold text-gray-800 mb-16 text-center">
            Skills
          </h2>
          <div className="relative h-[1000px] overflow-hidden">
            <div className="absolute inset-0">
              {/* 服务端渲染时的占位内容 */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="absolute w-[200px] h-[250px] glass-effect rounded-[20px] p-6" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-alice overflow-hidden">
      <div className="w-full px-4 py-20">
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
          Skills
        </motion.h2>

        <div 
          ref={containerRef}
          className="relative h-[1000px] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0">
            {visibleCards.map((card, index) => {
              const centerPosition = card.isPaused ? calculateCenterPosition(card.id) : null;
              
              return (
                <motion.div
                  key={card.id}
                  id={card.id}
                  className="absolute w-[200px] h-[250px] cursor-pointer"
                  initial={{ 
                    x: 2000,
                    y: card.startY,
                    opacity: 0
                  }}
                  animate={{ 
                    x: card.isPaused ? centerPosition!.x : -200,
                    y: card.isPaused ? centerPosition!.y : card.startY,
                    opacity: card.isRemoving ? 0 : [0, 1, 1, 0],
                    scale: card.isRemoving ? 0.8 : 1
                  }}
                  transition={{
                    x: {
                      duration: card.isPaused ? 0.5 : 20,
                      ease: card.isPaused ? "easeOut" : "linear"
                    },
                    y: {
                      duration: 0.5,
                      ease: "easeOut"
                    },
                    opacity: {
                      duration: card.isRemoving ? 0.5 : 20,
                      times: card.isRemoving ? [0, 1] : [0, 0.1, 0.9, 1]
                    },
                    scale: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }}
                  style={{
                    animationDuration: card.isPaused ? "0s" : `${20 / currentSpeed}s`,
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                  onHoverStart={() => setHoveredCard(card.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => handleCardClick(card.id)}
                >
                  <motion.div
                    className={`glass-effect rounded-[20px] p-8 flex flex-col ${
                      hoveredCard === card.id ? 'scale-105' : ''
                    } ${card.isPaused ? 'min-h-[400px] backdrop-blur-md bg-white/70 shadow-2xl' : 'h-full'}`}
                    animate={{
                      scale: card.isPaused ? 2 : hoveredCard === card.id ? 1.05 : 1,
                      zIndex: card.isPaused ? 100 : hoveredCard === card.id ? 10 : 1
                    }}
                    transition={{
                      scale: { duration: 0.3 }
                    }}
                  >
                    <div className="text-4xl mb-4">{card.skill.icon}</div>
                    <h3 className="text-xl font-bold text-alice-primary mb-2">{card.skill.title}</h3>
                    <p className="text-gray-600 text-base mb-4">{card.skill.description}</p>
                    
                    <AnimatePresence>
                      {card.isPaused && !card.isRemoving && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-auto"
                        >
                          <ul className="space-y-3">
                            {card.skill.details.map((detail, idx) => (
                              <li key={idx} className="text-lg text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-alice-primary rounded-full mr-3"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 