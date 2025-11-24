export default function SudokuCell({
  cell,
  position,
  isSelected,
  isInSelectedRow,
  isInSelectedCol,
  isInSelectedBox,
  pencilMode,          // new prop for pencil mode
  onSelect,
  onValueChange,
}) {
  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (!cell.isEditable) return;

    const key = e.key;

    if (key === 'Backspace' || key === 'Delete') {
      if (pencilMode) {
        // Clear all pencil marks
        onValueChange(position, cell.value, []);
      } else {
        onValueChange(position, null, cell.pencilMarks);
      }
      return;
    }

    const num = parseInt(key, 10);
    if (num >= 1 && num <= 9) {
      if (pencilMode) {
        // Toggle pencil mark
        const marks = cell.pencilMarks || [];
        if (marks.includes(num)) {
          onValueChange(position, cell.value, marks.filter(n => n !== num));
        } else {
          onValueChange(position, cell.value, [...marks, num]);
        }
      } else {
        // Set main value
        onValueChange(position, num, []);
      }
    }
  };

  const getBackgroundColor = () => {
    if (isSelected) return 'bg-blue-200';
    if (isInSelectedBox) return 'bg-blue-50';
    if (isInSelectedRow || isInSelectedCol) return 'bg-gray-100';
    return 'bg-white';
  };

  const getBorderStyle = () => {
    const borders = [];
    if (position.row % 3 === 0) borders.push('border-t-2');
    if (position.col % 3 === 0) borders.push('border-l-2');
    if (position.row === 8) borders.push('border-b-2');
    if (position.col === 8) borders.push('border-r-2');
    return borders.join(' ');
  };

  return (
    <div
      onClick={() => onSelect(position)}
      className={`
        w-full h-full aspect-square border border-gray-300 ${getBorderStyle()} 
        ${getBackgroundColor()} 
        relative cursor-text
      `}
    >
      {/* Main value */}
      {cell.value ? (
        <span
          className={`
            absolute inset-0 flex items-center justify-center 
            text-xl sm:text-2xl font-semibold
            ${!cell.isEditable ? 'text-gray-900 font-bold' : 'text-blue-600'}
            ${cell.isError ? 'text-red-500' : ''}
          `}
        >
          {cell.value}
        </span>
      ) : (
        // Pencil marks
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-xs sm:text-sm p-1 gap-0.5 text-gray-500">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="flex items-center justify-center">
              {cell.pencilMarks?.includes(i + 1) ? i + 1 : ''}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        inputMode="numeric"
        maxLength={1}
        className="absolute inset-0 opacity-0 cursor-text"
        onKeyDown={handleKeyDown}
        readOnly={!cell.isEditable}
      />
    </div>
  );
}
