// Difficulty type (string union)
export const Difficulty = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

/**
 * @typedef {Object} Cell
 * @property {number|null} value
 * @property {boolean} isEditable
 * @property {boolean} isHighlighted
 * @property {boolean} isError
 */

/**
 * @typedef {Object} Position
 * @property {number} row
 * @property {number} col
 */

/**
 * @typedef {Object} GameState
 * @property {Cell[][]} board
 * @property {Position|null} selectedCell
 * @property {number} mistakes
 * @property {number} hintsRemaining
 * @property {'Easy' | 'Medium' | 'Hard'} difficulty
 */
