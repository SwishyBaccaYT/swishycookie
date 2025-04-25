import React from 'react';

const GameFooter: React.FC = () => {
  return (
    <footer className="bg-card py-3 px-6 text-center text-sm text-gray-400">
      <p>© 2023 Swishybacca Clicker | Game progress is automatically saved</p>
      <p className="mt-1">Made with <i className="fas fa-heart text-red-500"></i> for Wookiee fans</p>
    </footer>
  );
};

export default GameFooter;
