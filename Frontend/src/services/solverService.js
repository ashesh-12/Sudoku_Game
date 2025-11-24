// src/services/solverService.js

/**
 * Send the current board to backend to get the solved board.
 * @param {Array<Array<{value: number|null, isEditable: boolean}>>} board
 * @returns {Promise<Array<Array<{value: number|null, isEditable: boolean}>>>} solved board
 */
export async function solveBoard(board) {
  try {
    const response = await fetch('http://localhost:5000/solve', { // your backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board }),
    });

    if (!response.ok) {
      throw new Error('Failed to solve the board');
    }

    const data = await response.json();
    return data.solvedBoard; // backend should return { solvedBoard: [...] }
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Optional: validate a move using backend
 */
export async function validateMove(board, row, col, value) {
  try {
    const response = await fetch('http://localhost:5000/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board, row, col, value }),
    });

    if (!response.ok) throw new Error('Validation failed');

    const data = await response.json();
    return data.isValid; // backend returns { isValid: true/false }
  } catch (err) {
    console.error(err);
    return false;
  }
}
