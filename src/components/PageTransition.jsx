import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
