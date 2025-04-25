import React from 'react';
import UpgradeCard from './UpgradeCard';
import { UpgradeType } from '@/lib/gameState';

const UpgradesPanel: React.FC = () => {
  const upgrades: Array<{
    id: UpgradeType;
    title: string;
    description: string;
    icon: string;
    specialStyle?: boolean;
  }> = [
    {
      id: 'clickPower',
      title: 'Lightsaber Training',
      description: 'Increase your click power by 1 point per click.',
      icon: 'fa-hand-pointer',
    },
    {
      id: 'autoClicker',
      title: 'Force Automation',
      description: 'Automatically clicks once every second.',
      icon: 'fa-robot',
    },
    {
      id: 'pointMultiplier',
      title: 'Wookiee Strength',
      description: 'Multiply all points earned by 1.2x.',
      icon: 'fa-bolt',
    },
    {
      id: 'criticalClick',
      title: 'Jedi Precision',
      description: '10% chance for critical clicks that give 3x points.',
      icon: 'fa-crosshairs',
    },
    {
      id: 'specialUpgrade',
      title: 'Force Mastery',
      description: 'Unlocks special star power abilities.',
      icon: 'fa-magic',
      specialStyle: true,
    },
  ];

  return (
    <div className="w-full md:w-1/3 bg-card p-6 overflow-y-auto">
      <h2 className="text-2xl font-heading text-foreground mb-6">
        <i className="fas fa-arrow-circle-up mr-2 text-secondary"></i>Upgrades
      </h2>
      
      <div className="space-y-4">
        {upgrades.map((upgrade) => (
          <UpgradeCard 
            key={upgrade.id}
            upgradeType={upgrade.id}
            title={upgrade.title}
            description={upgrade.description}
            icon={upgrade.icon}
            specialStyle={upgrade.specialStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradesPanel;
