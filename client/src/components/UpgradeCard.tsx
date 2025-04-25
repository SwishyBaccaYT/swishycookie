import React from 'react';
import { UpgradeType, upgradesConfig } from '@/lib/gameState';
import { useGameState } from '@/hooks/useGameState';
import LevelIndicator from '@/components/ui/level-indicator';

interface UpgradeCardProps {
  upgradeType: UpgradeType;
  title: string;
  description: string;
  icon: string;
  specialStyle?: boolean;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({
  upgradeType,
  title,
  description,
  icon,
  specialStyle = false
}) => {
  const { gameState, purchaseUpgrade, calculateCost } = useGameState();
  
  const level = gameState[`${upgradeType}Level`];
  const cost = calculateCost(upgradeType);
  const maxLevel = upgradesConfig[upgradeType].maxLevel;
  const isAffordable = gameState.points >= cost;
  const isMaxed = level >= maxLevel;
  const isLocked = upgradeType === 'specialUpgrade' && gameState.points < 1000;
  
  const handlePurchase = () => {
    if (isAffordable && !isMaxed) {
      purchaseUpgrade(upgradeType);
    }
  };
  
  return (
    <div 
      className={`upgrade-card bg-gray-800 rounded-lg p-4 shadow-lg relative overflow-hidden ${(!isAffordable || isLocked) ? 'upgrade-locked' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium ${specialStyle ? 'text-purple-400' : 'text-foreground'}`}>
          {title}
        </h3>
        <div className="text-accent font-bold">
          <i className="fas fa-coins mr-1"></i>{cost}
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      <div className="flex justify-between items-center">
        <LevelIndicator
          currentLevel={level}
          maxLevel={maxLevel}
        />
        <button 
          onClick={handlePurchase}
          disabled={!isAffordable || isMaxed}
          className={`px-3 py-1 ${specialStyle ? 'bg-purple-600 hover:bg-purple-700' : 'bg-primary hover:bg-blue-600'} text-white text-sm rounded-md transition-colors ${(!isAffordable || isMaxed) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isMaxed 
            ? 'Maxed' 
            : isLocked 
              ? <><i className="fas fa-lock mr-1"></i>Unlock</> 
              : <><i className="fas fa-plus-circle mr-1"></i>Upgrade</>
          }
        </button>
      </div>
      <div className="absolute top-0 right-0 p-1">
        <i className={`fas ${icon} ${specialStyle ? 'text-purple-500' : 'text-primary'} text-opacity-20 text-3xl`}></i>
      </div>
    </div>
  );
};

export default UpgradeCard;
