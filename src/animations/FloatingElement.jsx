import React from 'react';
import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, yOffset = 15, duration = 4, className = '' }) => {
  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
