import React, { createContext, useEffect, useRef, useState, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { GameState, initialGameState, audioFiles } from '@/lib/gameState';
import { saveGame, loadGame, resetGame } from '@/lib/storage';

interface GameContextType {
  gameState: GameState;
  updateGameState: (updater: (draft: GameState) => void) => void;
  toggleSound: () => void;
  playSound: (soundType: 'click' | 'upgrade' | 'critical') => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, updateGameState] = useImmer<GameState>(loadGame());
  
  // Audio elements
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    click: null,
    upgrade: null,
    critical: null,
  });
  
  // Setup audio elements
  useEffect(() => {
    audioRefs.current.click = new Audio(audioFiles.click);
    audioRefs.current.upgrade = new Audio(audioFiles.upgrade);
    audioRefs.current.critical = new Audio(audioFiles.critical);
    
    // Set volume
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = 0.3;
    });
    
    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) audio.pause();
      });
    };
  }, []);
  
  // Play sound function
  const playSound = useCallback((soundType: 'click' | 'upgrade' | 'critical') => {
    if (gameState.soundEnabled && audioRefs.current[soundType]) {
      const audio = audioRefs.current[soundType];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error('Error playing sound:', e));
      }
    }
  }, [gameState.soundEnabled]);
  
  // Toggle sound
  const toggleSound = useCallback(() => {
    updateGameState(draft => {
      draft.soundEnabled = !draft.soundEnabled;
    });
  }, [updateGameState]);
  
  // Reset game
  const handleResetGame = useCallback(() => {
    resetGame();
    updateGameState(() => ({
      ...initialGameState,
      startTime: Date.now()
    }));
  }, [updateGameState]);
  
  // Save game to localStorage whenever state changes
  useEffect(() => {
    saveGame(gameState);
  }, [gameState]);
  
  // Auto-clicker effect
  useEffect(() => {
    if (gameState.autoClickRate <= 0) return;
    
    const interval = setInterval(() => {
      updateGameState(draft => {
        const pointsEarned = draft.clickPower * draft.pointMultiplier * draft.autoClickRate / 10;
        draft.points += pointsEarned;
        draft.totalPointsEarned += pointsEarned;
      });
    }, 100); // 10 updates per second for smoother auto-clicking
    
    return () => clearInterval(interval);
  }, [gameState.autoClickRate, gameState.clickPower, gameState.pointMultiplier, updateGameState]);
  
  // Update time played effect
  useEffect(() => {
    const timer = setInterval(() => {
      // Force rerender
      updateGameState(draft => {
        draft.startTime = draft.startTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [updateGameState]);
  
  return (
    <GameContext.Provider 
      value={{
        gameState,
        updateGameState,
        toggleSound,
        playSound,
        resetGame: handleResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
