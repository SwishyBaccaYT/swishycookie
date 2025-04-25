import React from 'react';
import { useGameState } from '@/hooks/useGameState';

const GameStats: React.FC = () => {
  const { gameState } = useGameState();
  
  // Calculate time played in minutes and seconds
  const timePlayed = Math.floor((Date.now() - gameState.startTime) / 1000);
  const minutes = Math.floor(timePlayed / 60);
  const seconds = timePlayed % 60;
  
  // Calculate points per second
  const pointsPerSecond = gameState.autoClickRate * gameState.clickPower * gameState.pointMultiplier;
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-lg">
      <div className="bg-card rounded-lg p-4 shadow-lg w-full sm:w-5/12">
        <div className="text-sm text-gray-400 mb-1">Total Clicks</div>
        <div className="text-xl font-medium text-foreground">
          {gameState.totalClicks.toLocaleString()}
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 shadow-lg w-full sm:w-5/12">
        <div className="text-sm text-gray-400 mb-1">Points Per Second</div>
        <div className="text-xl font-medium text-secondary">
          {pointsPerSecond.toFixed(1)}
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 shadow-lg w-full sm:w-5/12">
        <div className="text-sm text-gray-400 mb-1">Total Points Earned</div>
        <div className="text-xl font-medium text-accent">
          {Math.floor(gameState.totalPointsEarned).toLocaleString()}
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 shadow-lg w-full sm:w-5/12">
        <div className="text-sm text-gray-400 mb-1">Time Played</div>
        <div className="text-xl font-medium text-foreground">
          {minutes}m {seconds}s
        </div>
      </div>
    </div>
  );
};

export default GameStats;
