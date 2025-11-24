import { useEffect } from 'react';

export default function useKeyboardNav(selectedCell, setSelectedCell) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowUp':
          newRow = row > 0 ? row - 1 : row;
          break;
        case 'ArrowDown':
          newRow = row < 8 ? row + 1 : row;
          break;
        case 'ArrowLeft':
          newCol = col > 0 ? col - 1 : col;
          break;
        case 'ArrowRight':
          newCol = col < 8 ? col + 1 : col;
          break;
        default:
          return;
      }

      e.preventDefault();
      setSelectedCell({ row: newRow, col: newCol });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, setSelectedCell]);
}
