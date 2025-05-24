import React from 'react';
import { useDrag } from 'react-dnd';
import { PieceType } from '../types';

interface PieceProps {
  type: PieceType;
  position: [number, number];
  timelineId: string;
  boardPosition: number;
}

const pieceSymbols: Record<string, string> = {
  'p': '♟', // 黑兵
  'r': '♜', // 黑车
  'n': '♞', // 黑马
  'b': '♝', // 黑象
  'q': '♛', // 黑后
  'k': '♚', // 黑王
  'P': '♙', // 白兵
  'R': '♖', // 白车
  'N': '♘', // 白马
  'B': '♗', // 白象
  'Q': '♕', // 白后
  'K': '♔', // 白王
};

const Piece: React.FC<PieceProps> = ({ type, position, timelineId, boardPosition }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PIECE',
    item: { 
      type, 
      position,
      timelineId,
      boardPosition
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (!type) return null;

  const isBlack = type.toLowerCase() === type;
  
  // 为白色棋子添加轻微的阴影以增强可见性，保持白色外观
  const whiteExtraStyle = !isBlack ? {
    color: '#fff',
    textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.8), -0.5px -0.5px 1px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)',
  } : {};
  
  return (
    <div
      ref={drag}
      className={`piece ${isBlack ? 'black' : 'white'} ${isDragging ? 'dragging' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        fontSize: '2rem',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ...whiteExtraStyle,
      }}
    >
      {pieceSymbols[type]}
    </div>
  );
};

export default Piece;
