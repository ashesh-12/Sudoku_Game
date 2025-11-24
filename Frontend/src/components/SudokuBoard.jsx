import SudokuCell from './SudokuCell';

export default function SudokuBoard({
  board,
  selectedCell,
  onCellSelect,
  onCellValueChange,
  pencilMode, // <-- add this prop
}) {
  const getBoxIndex = (row, col) => {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
  };

  const isInSelectedBox = (row, col) => {
    if (!selectedCell) return false;
    return (
      getBoxIndex(row, col) === getBoxIndex(selectedCell.row, selectedCell.col)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6">
      <div className="grid grid-cols-9 gap-0 w-full max-w-[500px] mx-auto aspect-square">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const position = { row: rowIndex, col: colIndex };

            const isSelected =
              selectedCell?.row === rowIndex &&
              selectedCell?.col === colIndex;

            const isInSelectedRow = selectedCell?.row === rowIndex;
            const isInSelectedCol = selectedCell?.col === colIndex;

            return (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                position={position}
                isSelected={isSelected}
                isInSelectedRow={isInSelectedRow}
                isInSelectedCol={isInSelectedCol}
                isInSelectedBox={isInSelectedBox(rowIndex, colIndex)}
                pencilMode={pencilMode} // <-- forward pencilMode
                onSelect={onCellSelect}
                onValueChange={onCellValueChange}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
