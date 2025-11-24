export default function Navbar({ difficulty, onDifficultyChange, onNewGame }) {
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Sudoku</h1>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  difficulty === diff
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <button
            onClick={onNewGame}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            New Game
          </button>
        </div>
      </div>
    </nav>
  );
}
