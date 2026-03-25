import React from 'react';
import { motion } from 'framer-motion';

export default function GlowButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",  // "primary" (purple/blue) or "secondary" (glass)
  disabled = false 
}) {
  const glowClass = variant === "primary" ? "glow-button" : "glow-button-glass";

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${glowClass} ${className}`}
    >
      {children}
    </motion.button>
  );
}
