import { GameState, initialGameState } from './gameState';

const STORAGE_KEY = 'swishybaccaClickerSave';

export const saveGame = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (): GameState => {
  try {
    const savedGame = localStorage.getItem(STORAGE_KEY);
    if (savedGame) {
      return {...initialGameState, ...JSON.parse(savedGame)};
    }
  } catch (error) {
    console.error('Failed to load game:', error);
  }
  return initialGameState;
};

export const resetGame = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset game:', error);
  }
};
