import React from 'react';

interface LevelIndicatorProps {
  currentLevel: number;
  maxLevel: number;
  maxDots?: number;
}

export const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  currentLevel,
  maxLevel,
  maxDots = 5
}) => {
  const visibleDots = Math.min(maxDots, maxLevel);
  
  return (
    <div className="level-indicator">
      {Array.from({ length: visibleDots }).map((_, index) => (
        <div 
          key={index} 
          className={`level-dot ${index < currentLevel ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

export default LevelIndicator;
