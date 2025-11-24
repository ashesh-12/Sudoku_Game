// No TypeScript types in JS version

export function generateEmptyBoard() {
  return Array(9)
    .fill(null)
    .map(() =>
      Array(9)
        .fill(null)
        .map(() => ({
          value: null,
          isEditable: true,
          isHighlighted: false,
          isError: false,
        }))
    );
}

export function generateSampleBoard(difficulty) {
  const samplePuzzle = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];

  const cellsToRemove = {
    Easy: 0,
    Medium: 10,
    Hard: 20,
  };

  const board = samplePuzzle.map(row =>
    row.map(value => ({
      value,
      isEditable: value === null,
      isHighlighted: false,
      isError: false,
    }))
  );

  let removed = 0;
  const maxToRemove = cellsToRemove[difficulty];

  while (removed < maxToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (!board[row][col].isEditable && board[row][col].value !== null) {
      board[row][col].value = null;
      board[row][col].isEditable = true;
      removed++;
    }
  }

  return board;
}
