import { Lightbulb, CheckCircle, BookOpen } from 'lucide-react';

export default function Sidebar({
  mistakes,
  maxMistakes,
  hintsRemaining,
  onHint,
  onSolve,
  onTeachMe, 
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Mistakes & Hints Info */}
      <div className="space-y-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Mistakes</h3>
          <p className="text-3xl font-bold text-red-600">
            {mistakes} / {maxMistakes}
          </p>
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Hints Available</h3>
          <p className="text-3xl font-bold text-amber-600">{hintsRemaining}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <button
          onClick={onHint}
          disabled={hintsRemaining === 0}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
            hintsRemaining > 0
              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          <span>Hint ({hintsRemaining})</span>
        </button>

        {/* <button
          onClick={onUndo}
          className="w-full flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          <Undo className="w-5 h-5" />
          <span>Undo</span>
        </button> */}

        <button
          onClick={onSolve}
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Solve</span>
        </button>

        <button
          onClick={onTeachMe} // Teach Me action
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-all hover:shadow-lg active:scale-95"
        >
          <BookOpen className="w-5 h-5" />
          <span>Teach Me</span>
        </button>
      </div>
    </div>
  );
}
