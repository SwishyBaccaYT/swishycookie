import React, { useState, useRef, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { motion } from 'framer-motion';
import PointsPopup from '@/components/ui/points-popup';
import GameStats from '@/components/GameStats';

interface ClickEvent {
  x: number;
  y: number;
  amount: number;
  isCritical: boolean;
  id: number;
}

const ClickerArea: React.FC = () => {
  const { 
    gameState,
    handleClick,
  } = useGameState();
  
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const nextIdRef = useRef(0);
  
  const handleClickArea = (e: React.MouseEvent<HTMLDivElement>) => {
    const { pointsEarned, isCritical } = handleClick();
    
    setClickEvents(prev => [
      ...prev, 
      { 
        x: e.clientX, 
        y: e.clientY, 
        amount: pointsEarned, 
        isCritical, 
        id: nextIdRef.current++
      }
    ]);
    
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };
  
  const removeClickEvent = (id: number) => {
    setClickEvents(prev => prev.filter(event => event.id !== id));
  };
  
  return (
    <div className="w-full md:w-2/3 p-6 flex flex-col items-center justify-center relative">
      {/* Points counter */}
      <div className="points-counter text-4xl md:text-5xl font-bold text-accent mb-8 text-center">
        <span>{Math.floor(gameState.points)}</span> Points
      </div>
      
      {/* Character container */}
      <div className="character-container relative mb-8 mt-4">
        <div 
          className="clickable-area w-full h-full rounded-full bg-gradient-to-b from-blue-500/20 to-transparent p-2 flex items-center justify-center animate-pulse-slow"
          onClick={handleClickArea}
        >
          <motion.img 
            src="https://yt3.googleusercontent.com/_7t6KcBUQZaW9NX7YyObbHPtAJeXkSGXW9D2j1eerkYKXwfG2ZIaB_ObcGmHEsphAyCA29QoWw=s160-c-k-c0x00ffffff-no-rj" 
            alt="Swishybacca" 
            className={`w-full h-full object-cover rounded-full hover:animate-shake transform transition-transform active:scale-95 ${isShaking ? 'animate-shake' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
        {gameState.autoClickRate > 0 && (
          <div className="auto-click-indicator">
            Auto-clicking: {gameState.autoClickRate.toFixed(1)}/sec
          </div>
        )}
      </div>
      
      {/* Click power indicator */}
      <div className="text-lg text-foreground text-center mb-4">
        <i className="fas fa-hand-pointer text-primary mr-2"></i>
        Click Power: <span>{gameState.clickPower}</span> points per click
      </div>
      
      {/* Stats section */}
      <GameStats />
      
      {/* Click popups */}
      {clickEvents.map(event => (
        <PointsPopup 
          key={event.id}
          x={event.x}
          y={event.y}
          amount={event.amount}
          isCritical={event.isCritical}
          onAnimationComplete={() => removeClickEvent(event.id)}
        />
      ))}
    </div>
  );
};

export default ClickerArea;
