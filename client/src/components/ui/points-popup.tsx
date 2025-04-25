import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PointsPopupProps {
  x: number;
  y: number;
  amount: number;
  isCritical: boolean;
  onAnimationComplete: () => void;
}

const PointsPopup: React.FC<PointsPopupProps> = ({
  x,
  y,
  amount,
  isCritical,
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {isVisible && (
        <motion.div
          className="points-popup"
          style={{
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            fontWeight: 'bold',
            fontSize: isCritical ? '1.5rem' : '1.2rem',
            color: isCritical ? '#FBBF24' : '#FFFFFF',
            zIndex: 50,
            pointerEvents: 'none',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -30 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          +{Math.floor(amount)}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PointsPopup;
