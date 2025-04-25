import React from 'react';
import GameHeader from './GameHeader';
import ClickerArea from './ClickerArea';
import UpgradesPanel from './UpgradesPanel';
import GameFooter from './GameFooter';

const GameContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader />
      <main className="flex-grow flex flex-col md:flex-row">
        <ClickerArea />
        <UpgradesPanel />
      </main>
      <GameFooter />
    </div>
  );
};

export default GameContainer;
