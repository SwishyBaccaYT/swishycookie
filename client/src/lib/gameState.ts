export interface GameState {
  points: number;
  clickPower: number;
  autoClickRate: number;
  clickPowerLevel: number;
  autoClickerLevel: number;
  pointMultiplierLevel: number;
  criticalClickLevel: number;
  specialUpgradeLevel: number;
  pointMultiplier: number;
  criticalClickChance: number;
  totalClicks: number;
  totalPointsEarned: number;
  startTime: number;
  soundEnabled: boolean;
}

export const initialGameState: GameState = {
  points: 0,
  clickPower: 1,
  autoClickRate: 0,
  clickPowerLevel: 0,
  autoClickerLevel: 0,
  pointMultiplierLevel: 0,
  criticalClickLevel: 0,
  specialUpgradeLevel: 0,
  pointMultiplier: 1,
  criticalClickChance: 0,
  totalClicks: 0,
  totalPointsEarned: 0,
  startTime: Date.now(),
  soundEnabled: true,
};

export type UpgradeType = 'clickPower' | 'autoClicker' | 'pointMultiplier' | 'criticalClick' | 'specialUpgrade';

export interface UpgradeConfig {
  baseCost: number;
  costMultiplier: number;
  maxLevel: number;
  effect: number;
}

export const upgradesConfig: Record<UpgradeType, UpgradeConfig> = {
  clickPower: {
    baseCost: 10,
    costMultiplier: 1.5,
    maxLevel: 10,
    effect: 1 // Additional points per click
  },
  autoClicker: {
    baseCost: 50,
    costMultiplier: 1.8,
    maxLevel: 10,
    effect: 1 // Clicks per second
  },
  pointMultiplier: {
    baseCost: 100,
    costMultiplier: 2,
    maxLevel: 5,
    effect: 0.2 // Multiplier increase per level
  },
  criticalClick: {
    baseCost: 200,
    costMultiplier: 2.2,
    maxLevel: 5,
    effect: 0.1 // Critical chance increase per level
  },
  specialUpgrade: {
    baseCost: 1000,
    costMultiplier: 3,
    maxLevel: 1,
    effect: 1
  }
};

export const calculateUpgradeCost = (upgradeType: UpgradeType, level: number): number => {
  return Math.floor(upgradesConfig[upgradeType].baseCost * Math.pow(upgradesConfig[upgradeType].costMultiplier, level));
};

export const audioFiles = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2022/07/19/sfx_click_short_001_110.mp3',
  upgrade: 'https://assets.mixkit.co/active_storage/sfx/2022/07/19/sfx_game_positive_outcome_2_85.mp3',
  critical: 'https://assets.mixkit.co/active_storage/sfx/2022/07/19/sfx_game_power_up_015_84.mp3',
};
