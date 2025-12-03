// Import all trophy cards
import { FF7RebirthCard } from './cards/FF7Rebirth';
import { LiSDoubleExposureCard } from './cards/LiSDoubleExposure';
import { FF7RemakeCard } from './cards/FF7Remake';
import { BloodborneCard } from './cards/Bloodborne';

/**
 * Trophy Cards Registry
 * 
 * This file exports all trophy card configurations.
 * Each card is a function that returns an object with:
 * - id: unique identifier
 * - platinumNumber: trophy number (90, 89, 88, etc.)
 * - gameTitle: full game title (for searching)
 * - platinumName: platinum trophy name (for searching)
 * - difficulty: difficulty rating 0-10
 * - enjoyment: enjoyment rating 0-10
 * - completedDate: completion date (for sorting)
 * - backgroundImage: path to background image
 * - content: JSX content for the card
 * 
 * Cards that need state (like FF7Rebirth and LiSDoubleExposure) 
 * receive state and setState as parameters.
 */

export const getTrophyCards = (state, setState) => {
  const cards = [
    FF7RebirthCard(state, setState),
    LiSDoubleExposureCard(state, setState),
    FF7RemakeCard(),
    BloodborneCard(),
    // Add more trophy cards here as you create them
    // Example: MyNewGameCard(),
  ];

  // Add metadata to each card for filtering/sorting
  // This allows the data to be embedded in the JSX but also accessible for sorting
  return cards.map(card => ({
    ...card,
    // Extract metadata if not already provided
    gameTitle: card.gameTitle || extractGameTitle(card),
    platinumName: card.platinumName || extractPlatinumName(card),
    difficulty: card.difficulty !== undefined ? card.difficulty : 5,
    enjoyment: card.enjoyment !== undefined ? card.enjoyment : 5,
    completedDate: card.completedDate || extractCompletedDate(card),
  }));
};

// Helper functions to extract data from JSX if not explicitly provided
function extractGameTitle(card) {
  // You can add logic here to parse from JSX if needed
  // For now, return a default or the id
  return card.id;
}

function extractPlatinumName(card) {
  return '';
}

function extractCompletedDate(card) {
  return null;
}

// Export individual cards if needed elsewhere
export {
  FF7RebirthCard,
  LiSDoubleExposureCard,
  FF7RemakeCard,
  BloodborneCard,
};
