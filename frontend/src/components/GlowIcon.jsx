import React from 'react';
import { motion } from 'framer-motion';

export default function GlowIcon({ Icon, color = '#8b5cf6', size = 24, className = "" }) {
  return (
    <motion.div
      className={`glow-icon-wrapper ${className}`}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon 
        size={size} 
        className="glow-icon-svg"
        style={{ 
          color: color,
          filter: `drop-shadow(0 0 8px ${color})` 
        }} 
        strokeWidth={2}
      />
    </motion.div>
  );
}
