export default function PencilToggle({ pencilMode, setPencilMode }) {
  return (
    <button
      onClick={() => setPencilMode(prev => !prev)}
      className={`
        w-full py-2 px-4 rounded-lg font-semibold transition-all shadow-md
        ${pencilMode
          ? 'bg-yellow-400 text-white hover:bg-yellow-500'
          : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}
      `}
    >
      {pencilMode ? '✏️ Pencil Mode ON' : '✏️ Pencil Mode OFF'}
    </button>
  );
}
