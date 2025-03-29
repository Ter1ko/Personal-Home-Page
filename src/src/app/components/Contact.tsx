'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加发送消息的逻辑
    console.log('Message:', message);
    setMessage('');
  };

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
          Contact
        </motion.h2>

        <div className="max-w-[1200px] mx-auto">
          <motion.div 
            className="glass-effect rounded-[20px] p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              height: '600px',
              maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
            }}
          >
            <div className="flex h-full">
              {/* 左侧标题 */}
              <div className="w-1/2 flex items-center justify-center -mt-[300px]">
                <motion.h3 
                  className="text-[72px] text-gray-800"
                  style={{ 
                    fontFamily: '"Fiolex Girls", cursive',
                    fontWeight: 'normal'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Let's chat
                </motion.h3>
              </div>

              {/* 右侧内容 */}
              <div className="w-1/2 relative">
                {/* GitHub链接 */}
                <motion.div
                  className="absolute top-[80px] left-[10%]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Image
                        src="/window.svg"
                        alt="GitHub"
                        width={24}
                        height={24}
                        className="[filter:invert(0.5)_sepia(1)_saturate(1000%)_hue-rotate(180deg)_brightness(0.8)_contrast(1.2)]"
                      />
                    </div>
                    <div className="text-gray-800">
                      <div className="text-sm text-gray-500">GitHub</div>
                      <div className="text-[40px]">@Ter1ko</div>
                    </div>
                  </div>
                </motion.div>

                {/* 邮箱链接 */}
                <motion.div
                  className="absolute top-[180px] left-[10%]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <Image
                        src="/globe.svg"
                        alt="Email"
                        width={24}
                        height={24}
                        className="[filter:invert(0.5)_sepia(1)_saturate(1000%)_hue-rotate(180deg)_brightness(0.8)_contrast(1.2)]"
                      />
                    </div>
                    <div className="text-gray-800">
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-[40px]">liketeriko@gmail.com</div>
                    </div>
                  </div>
                </motion.div>

                {/* 反馈表单 */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="absolute top-[320px] left-[10%] w-[80%]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="输入您的反馈..."
                      className="w-full h-56 p-4 rounded-[20px] bg-white/5 border border-white/10 focus:outline-none focus:border-alice-primary/50 text-gray-800 placeholder-gray-400 resize-none transition-all duration-300 shadow-inner"
                    />
                  </div>
                  <div className="mt-4">
                    <motion.button
                      type="submit"
                      className="w-[200px] px-8 py-6 bg-[#4ECDC4] text-white rounded-[20px] hover:bg-[#45B7AF] transition-all duration-300 text-lg font-medium shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message ✨
                    </motion.button>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 