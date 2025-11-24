import { useState, useCallback } from 'react';

export default function useUndoHistory(initialBoard, setBoard) {
  const [history, setHistory] = useState([initialBoard]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add new board to history
  const addHistory = useCallback((newBoard) => {
    const updatedHistory = history.slice(0, currentIndex + 1);
    updatedHistory.push(newBoard.map(row => row.map(cell => ({ ...cell }))));
    setHistory(updatedHistory);
    setCurrentIndex(prev => prev + 1);
  }, [history, currentIndex]);

  // Undo
const undo = useCallback(() => {
  setCurrentIndex(prevIndex => {
    if (prevIndex === 0) return prevIndex; // nothing to undo
    const newIndex = prevIndex - 1;

    setBoard(history[newIndex]?.map(row => row.map(cell => ({ ...cell }))));
    return newIndex;
  });
}, [history, setBoard]);

  // Redo
const redo = useCallback(() => {
  setCurrentIndex(prevIndex => {
    if (prevIndex >= history.length - 1) return prevIndex;
    const newIndex = prevIndex + 1;

    setBoard(history[newIndex]?.map(row => row.map(cell => ({ ...cell }))));
    return newIndex;
  });
}, [history, setBoard]);


  // Reset history
  const reset = useCallback((board) => {
    setHistory([board]);
    setCurrentIndex(0);
  }, []);

  return { history, currentIndex, addHistory, undo, redo, reset };
}
