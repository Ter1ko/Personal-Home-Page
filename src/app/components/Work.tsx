'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  date: string;
  category: 'web' | 'github' | 'competition' | 'other';
  fullDescription?: string;
  details?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "个人主页",
    description: "基于Next.js和Tailwind CSS构建的现代化个人主页，展示个人经历、技能和作品",
    image: "/globe.svg",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Ter1ko/Personal-Home-Page",
    date: "2024",
    category: "web",
    fullDescription: "这是一个使用Next.js和Tailwind CSS构建的现代化个人主页。网站采用了响应式设计，并使用了Framer Motion实现流畅的动画效果。主要特点包括：",
    details: [
      "响应式设计，完美适配各种设备",
      "流畅的页面过渡动画和交互效果",
      "现代化的UI设计，包含玻璃态效果",
      "优化的性能表现和加载速度",
      "模块化的组件设计，易于维护和扩展",
      "优雅的动画过渡，提升用户体验"
    ]
  },
  {
    id: 2,
    title: "相机标定",
    description: "本项目提供了一款用于相机标定和单目测距的工具，基于棋盘格标定法和 OpenCV 库实现。程序能够自动检测棋盘格角点，利用 EXIF 数据提取焦距信息（如果存在），进而计算相机矩阵、畸变参数以及相机到棋盘格的距离。",
    image: "/file.svg",
    tags: ["Python", "OpenCV", "计算机视觉", "相机标定"],
    github: "https://github.com/Ter1ko/CalibraDepth",
    date: "2023",
    category: "github",
    fullDescription: "这是一个基于OpenCV的相机标定与单目测距系统。项目实现了相机标定和距离测量功能，主要特点包括：",
    details: [
      "提供了高清无损的棋盘格图片",
      "棋盘格角点检测：自动检测并精细化处理棋盘格内角点",
      "相机标定：使用 OpenCV 对相机进行标定，计算相机矩阵和畸变系数",
      "单目距离测量：根据标定结果计算相机与棋盘格之间的距离",
      "EXIF 数据提取：如果图像中包含 EXIF 信息，则自动提取焦距，提升标定精度",
      "高分辨率图像优化：对高分辨率图像进行缩放处理，加快角点检测速度后再映射回原图尺寸"
    ]
  },
  {
    id: 3,
    title: "美赛E题",
    description: "2025美国大学生数学建模竞赛（ICM）Problem E: Making Room for Agriculture（农田生态系统优化问题）",
    image: "/window.svg",
    tags: ["数学建模", "数据分析", "团队协作"],
    date: "2025",
    category: "competition",
    fullDescription: "参加美国大学生数学建模竞赛(MCM)，负责数据分析和模型构建。项目主要关注农业可持续发展问题，包括：",
    details: [
      "主导建立多目标优化模型，结合遗传算法与灵敏度分析，量化土地分配对经济和生态的影响",
      "设计动态决策框架，分析农田生态系统动态过程，提出可持续解决方案",
      "全权负责论文撰写与可视化，独立绘制流程图，完成27页英文论文及10+图表",
      "获团队最高贡献评价"
    ]
  }
];

const Work = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
          Work
        </motion.h2>

        {/* 项目展示区域 */}
        <div className="relative h-[1200px] overflow-hidden">
          <div className="flex justify-center items-center h-full gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`relative h-[1000px] ${
                  expandedProject === project.id 
                    ? 'w-[1200px] z-10' 
                    : expandedProject === null 
                      ? 'w-[300px]' 
                      : 'w-[100px] opacity-50'
                } transition-all duration-500 ease-in-out`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: expandedProject === project.id ? 1 : expandedProject === null ? 1 : 0.5,
                  scale: expandedProject === project.id 
                    ? 1 
                    : hoveredProject === project.id 
                      ? 1.05 
                      : expandedProject === null 
                        ? 1 
                        : 0.8,
                  filter: expandedProject === project.id ? 'blur(0px)' : expandedProject === null ? 'blur(0px)' : 'blur(2px)',
                  x: 0 
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className={`relative h-full glass-effect rounded-[20px] overflow-hidden cursor-pointer transition-all duration-200 ${
                  hoveredProject === project.id ? 'ring-2 ring-alice-primary shadow-lg' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-alice-primary/10 to-alice-secondary/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={100}
                        height={100}
                        className="opacity-50 [filter:invert(0.5)_sepia(1)_saturate(1000%)_hue-rotate(180deg)_brightness(0.8)_contrast(1.2)]"
                      />
                    </div>
                  </div>
                  <motion.h3 
                    className="text-[60px] font-bold text-white text-center [writing-mode:vertical-lr] [text-orientation:upright] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                    animate={{
                      opacity: hoveredProject === project.id || expandedProject === project.id ? 0 : 1,
                      scale: hoveredProject === project.id ? 0.8 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <AnimatePresence>
                    {hoveredProject === project.id && expandedProject !== project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 flex flex-col justify-start p-8 pt-[130px]"
                      >
                        <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                        <p className="text-white/90 text-lg mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-white/20 rounded-full text-sm text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/80 flex flex-col p-8 pt-[160px] overflow-y-auto"
                      >
                        <h3 className="text-3xl font-bold mb-6 text-white">{project.title}</h3>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">{project.fullDescription}</p>
                        <ul className="space-y-4 mb-8">
                          {project.details?.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-alice-primary rounded-full mr-3 mt-2"></span>
                              <span className="text-white/90 text-lg leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-6 mt-auto">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-alice-primary hover:text-alice-secondary text-lg font-medium transition-colors duration-300"
                            >
                              查看项目 →
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-alice-primary hover:text-alice-secondary text-lg font-medium transition-colors duration-300"
                            >
                              GitHub →
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work; 