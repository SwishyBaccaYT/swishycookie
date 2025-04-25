import React from 'react';
import { useGameState } from '@/hooks/useGameState';

const GameHeader: React.FC = () => {
  const { soundEnabled, toggleSound, resetGameProgress } = useGameState();

  const handleResetClick = () => {
    if (window.confirm('Are you sure you want to reset all game progress?')) {
      resetGameProgress();
    }
  };

  return (
    <header className="bg-card py-4 px-6 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-heading text-accent">
          <i className="fas fa-star-half-alt mr-2"></i>Swishybacca Clicker
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={toggleSound}
            className="text-foreground hover:text-accent transition-colors"
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-xl`}></i>
          </button>
          <button 
            onClick={handleResetClick}
            className="text-foreground hover:text-destructive transition-colors"
            aria-label="Reset game"
          >
            <i className="fas fa-redo-alt text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
