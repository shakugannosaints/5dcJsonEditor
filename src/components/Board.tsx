import React, { useState } from 'react';
import { Board as BoardType } from '../types';
import Square, { PieceSelectorContext } from './Square';
import PieceSelector from './PieceSelector';

interface BoardProps {
  board: BoardType;
  timelineId: string;
  boardPosition: number;
}

const Board: React.FC<BoardProps> = ({ board, timelineId, boardPosition }) => {
  const { squares } = board;
  const size = squares.length;
  const [showPieceSelector, setShowPieceSelector] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<any>(undefined);

  return (
    <div className="board-container" style={{ margin: '10px', padding: '5px', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={() => setShowPieceSelector(!showPieceSelector)}
          style={{
            padding: '5px 10px',
            backgroundColor: showPieceSelector ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showPieceSelector ? '隐藏棋子编辑器' : '显示棋子编辑器'}
        </button>
      </div>
      
      <PieceSelectorContext.Provider value={{ selectedPiece, setSelectedPiece }}>
        {showPieceSelector && (
          <PieceSelector timelineId={timelineId} boardPosition={boardPosition} />
        )}
      
        <div 
          className="board" 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 40px)`,
            gridTemplateRows: `repeat(${size}, 40px)`,
            gap: '0px',
            border: '2px solid #333',
        }}
      >
        {squares.map((row, rowIndex) => 
          row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              position={[rowIndex, colIndex]}
              isBlack={(rowIndex + colIndex) % 2 === 1}
              timelineId={timelineId}
              boardPosition={boardPosition}
            />
          ))
        )}
      </div>
      </PieceSelectorContext.Provider>
    </div>
  );
};

export default Board;
