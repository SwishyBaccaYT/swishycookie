import { useContext } from 'react';
import { GameContext } from '@/contexts/GameContext';
import { UpgradeType, calculateUpgradeCost } from '@/lib/gameState';

export function useGameState() {
  const context = useContext(GameContext);
  
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  
  return {
    gameState: context.gameState,
    handleClick: (): { pointsEarned: number, isCritical: boolean } => {
      // Check for critical click
      let pointsEarned = context.gameState.clickPower;
      let isCritical = false;
      
      if (Math.random() < context.gameState.criticalClickChance) {
        pointsEarned *= 3;
        isCritical = true;
        context.playSound('critical');
      } else {
        context.playSound('click');
      }
      
      // Apply multiplier
      pointsEarned *= context.gameState.pointMultiplier;
      
      // Add points
      context.updateGameState(draft => {
        draft.points += pointsEarned;
        draft.totalPointsEarned += pointsEarned;
        draft.totalClicks += 1;
      });
      
      return { pointsEarned, isCritical };
    },
    calculateCost: (upgradeType: UpgradeType): number => {
      return calculateUpgradeCost(upgradeType, context.gameState[`${upgradeType}Level`]);
    },
    purchaseUpgrade: (upgradeType: UpgradeType): void => {
      const { gameState, updateGameState } = context;
      const level = gameState[`${upgradeType}Level`];
      const cost = calculateUpgradeCost(upgradeType, level);
      
      if (gameState.points >= cost) {
        updateGameState(draft => {
          draft.points -= cost;
          draft[`${upgradeType}Level`] += 1;
          
          // Apply upgrade effects
          switch (upgradeType) {
            case 'clickPower':
              draft.clickPower += 1;
              break;
            case 'autoClicker':
              draft.autoClickRate += 1;
              break;
            case 'pointMultiplier':
              draft.pointMultiplier += 0.2;
              break;
            case 'criticalClick':
              draft.criticalClickChance += 0.1;
              break;
            case 'specialUpgrade':
              // Special effect: Doubles auto click rate and click power
              draft.autoClickRate *= 2;
              draft.clickPower *= 2;
              break;
          }
        });
        
        context.playSound('upgrade');
      }
    },
    toggleSound: context.toggleSound,
    soundEnabled: context.gameState.soundEnabled,
    resetGameProgress: context.resetGame,
  };
}
