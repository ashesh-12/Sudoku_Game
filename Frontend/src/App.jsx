import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import SudokuBoard from './components/SudokuBoard';
import Sidebar from './components/Sidebar';
import Timer from './components/Timer';
import PencilToggle from './components/PencilToggle';
import { generateSampleBoard } from './utils/sudokuGenerator';
import useTimer from './hooks/useTimer';
import useUndoHistory from './hooks/useUndoHistory';
import useKeyboardNav from './hooks/useKeyboardNav';

function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [board, setBoard] = useState(() => generateSampleBoard('Easy'));
  const [selectedCell, setSelectedCell] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [pencilMode, setPencilMode] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0); // used to reset timer
  const maxMistakes = 3;

  // Timer hook
  const { formattedTime } = useTimer(isGameActive, resetTrigger);

  // Undo hook
  const { addHistory, undo } = useUndoHistory(board, setBoard);

  // Keyboard navigation hook
  useKeyboardNav(selectedCell, setSelectedCell, board, pencilMode, setBoard, addHistory);

  // Start a new game
  const handleNewGame = useCallback(() => {
    const newBoard = generateSampleBoard(difficulty);
    setBoard(newBoard);
    setSelectedCell(null);
    setMistakes(0);
    setHintsRemaining(3);
    setIsGameActive(true);           // start the timer
    setResetTrigger(prev => prev + 1); // trigger timer reset
    addHistory(newBoard);            // initialize undo history with new board
  }, [difficulty, addHistory]);

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  const handleCellSelect = useCallback((position) => {
    setSelectedCell(position);
  }, []);

const handleCellValueChange = useCallback((position, value, pencilMarks = []) => {
  setBoard(prevBoard => {
    const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
    const cell = newBoard[position.row][position.col];
    if (cell.isEditable) {
      cell.value = value;
      cell.pencilMarks = pencilMarks;
      addHistory(newBoard); // add undo history
    }
    return newBoard;
  });
}, [addHistory]);

  const handleHint = useCallback(() => {
    if (hintsRemaining > 0) setHintsRemaining(prev => prev - 1);
  }, [hintsRemaining]);

  const handleUndo = useCallback(() => {
    undo(); // undo last move
  }, [undo]);

  const handleSolve = useCallback(() => {
    console.log('Solve action triggered');
    // Future: integrate solver
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={handleNewGame}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full space-y-4">
            <Timer isActive={isGameActive} resetSignal={resetTrigger} />
            <PencilToggle pencilMode={pencilMode} setPencilMode={setPencilMode} />
            <SudokuBoard
              board={board}
              selectedCell={selectedCell}
              onCellSelect={handleCellSelect}
              onCellValueChange={handleCellValueChange}
              pencilMode={pencilMode} 
            />
          </div>

          <div className="w-full lg:w-80">
            <Sidebar
              mistakes={mistakes}
              maxMistakes={maxMistakes}
              hintsRemaining={hintsRemaining}
              onHint={handleHint}
              // onUndo={handleUndo}
              onSolve={handleSolve}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
