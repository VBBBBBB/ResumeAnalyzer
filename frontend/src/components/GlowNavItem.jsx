import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlowIcon from './GlowIcon';

export default function GlowNavItem({ to, label, Icon, color, isActive, size = 18 }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive: linkActive }) => 
        `nav-item ${linkActive || isActive ? 'active glow-nav' : ''}`
      }
    >
      {({ isActive: linkActive }) => (
        <>
          <GlowIcon 
            Icon={Icon} 
            color={color} 
            size={size} 
            className={(linkActive || isActive) ? "glow-active" : ""}
          />
          <span className="nav-label">{label}</span>
          {(linkActive || isActive) && (
            <motion.div 
              layoutId="nav-indicator"
              className="nav-indicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}
