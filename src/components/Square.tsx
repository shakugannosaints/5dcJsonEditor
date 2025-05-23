import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { PieceType } from '../types';
import Piece from './Piece';
import { useEditor } from '../context/EditorContext';

// 创建一个上下文来共享选中的棋子
export const PieceSelectorContext = React.createContext<{
  selectedPiece: PieceType | undefined;
  setSelectedPiece: (piece: PieceType | undefined) => void;
}>({
  selectedPiece: undefined,
  setSelectedPiece: () => {}
});

interface SquareProps {
  piece: PieceType;
  position: [number, number];
  isBlack: boolean;
  timelineId: string;
  boardPosition: number;
}

const Square: React.FC<SquareProps> = ({ piece, position, isBlack, timelineId, boardPosition }) => {
  const { dispatch } = useEditor();
  const { selectedPiece } = useContext(PieceSelectorContext);
  const [row, col] = position;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PIECE',
    drop: (item: { type: PieceType; position: [number, number]; timelineId: string; boardPosition: number }) => {
      if (item.timelineId === timelineId && item.boardPosition === boardPosition && 
          item.position[0] === row && item.position[1] === col) {
        return; // 拖放到原位置，不做任何操作
      }
      
      if (item.timelineId === timelineId && item.boardPosition === boardPosition) {
        // 同一棋盘内移动
        dispatch({
          type: 'MOVE_PIECE',
          payload: {
            timelineId,
            boardPosition,
            fromSquare: item.position,
            toSquare: position
          }
        });
      } else {
        // 跨棋盘移动，先删除原棋子，再在新位置添加
        dispatch({
          type: 'SET_PIECE',
          payload: {
            timelineId: item.timelineId,
            boardPosition: item.boardPosition,
            square: item.position,
            piece: null
          }
        });
        
        dispatch({
          type: 'SET_PIECE',
          payload: {
            timelineId,
            boardPosition,
            square: position,
            piece: item.type
          }
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // 处理点击事件，用于放置选中的棋子
  const handleClick = () => {
    if (selectedPiece !== undefined) {
      dispatch({
        type: 'SET_PIECE',
        payload: {
          timelineId,
          boardPosition,
          square: position,
          piece: selectedPiece
        }
      });
    }
  };

  return (
    <div
      ref={drop}
      className={`square ${isBlack ? 'black' : 'white'} ${isOver ? 'highlight' : ''}`}
      onClick={handleClick}
      style={{
        backgroundColor: isBlack ? '#b58863' : '#f0d9b5',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isOver ? '2px solid blue' : selectedPiece !== undefined ? '2px dashed green' : 'none',
        cursor: selectedPiece !== undefined ? 'pointer' : 'default',
      }}
    >
      {piece && (
        <Piece
          type={piece}
          position={position}
          timelineId={timelineId}
          boardPosition={boardPosition}
        />
      )}
    </div>
  );
};

export default Square;
