'use client';

import { Canvas } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { motion } from 'framer-motion-3d';

const DepthEffect = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="h-[100vh] w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <motion.group
          position={[0, 0, 0]}
          animate={{
            y: scrollYProgress.get() * 10,
            rotateX: scrollYProgress.get() * Math.PI,
          }}
        >
          <mesh>
            <boxGeometry args={[1, 0.2, 1]} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.6, 0.2, 0.6]} />
          </mesh>
        </motion.group>
      </Canvas>
    </div>
  );
};

export default DepthEffect; 