import React, { useState, useContext } from 'react';
import { PieceType } from '../types';
import { PieceSelectorContext } from './Square';
import { useLocale } from '../context/LocaleContext';

interface PieceSelectorProps {
  timelineId: string;
  boardPosition: number;
}

const PieceSelector: React.FC<PieceSelectorProps> = (_props) => {
  // 使用上下文中的状态，不需要dispatch
  const [isOpen, setIsOpen] = useState(false);
  const { selectedPiece, setSelectedPiece } = useContext(PieceSelectorContext);
  const { t } = useLocale();

  const pieceTypes: PieceType[] = ['p', 'r', 'n', 'b', 'q', 'k', 'P', 'R', 'N', 'B', 'Q', 'K', null];
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
    'null': '✕', // 删除棋子
  };

  const handlePieceSelect = (piece: PieceType) => {
    setSelectedPiece(piece);
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    // 关闭时重置选中的棋子
    if (!newIsOpen) {
      setSelectedPiece(undefined);
    }
  };

  return (
    <div className="piece-selector" style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <button 
          onClick={handleToggleOpen}
          style={{ 
            marginRight: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isOpen ? t.pieceSelector.closePieceSelector : t.pieceSelector.selectPiece}
        </button>
        {selectedPiece !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{t.pieceSelector.currentSelection} </span>
            <div style={{ 
              width: '30px', 
              height: '30px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              fontSize: '1.5rem',
              color: selectedPiece && selectedPiece.toLowerCase() === selectedPiece ? 'black' : '#fff',
              textShadow: selectedPiece && selectedPiece.toLowerCase() === selectedPiece ? 'none' : 
                '0.5px 0.5px 1px rgba(0,0,0,0.8), -0.5px -0.5px 1px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)',
              fontWeight: selectedPiece && selectedPiece.toLowerCase() !== selectedPiece ? 'bold' : 'normal',
              marginLeft: '5px'
            }}>
              {selectedPiece === null ? pieceSymbols['null'] : pieceSymbols[selectedPiece]}
            </div>
            <span style={{ marginLeft: '5px' }}>
              {t.pieceSelector.clickToPlace}
            </span>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '5px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          {pieceTypes.map((piece, index) => (
            <div 
              key={index}
              onClick={() => handlePieceSelect(piece)}
              style={{ 
                width: '40px', 
                height: '40px', 
                backgroundColor: '#ddd',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '1.8rem',
                color: piece && piece.toLowerCase() === piece ? 'black' : '#fff',
                textShadow: piece && piece.toLowerCase() === piece ? 'none' : 
                  '0.5px 0.5px 1px rgba(0,0,0,0.8), -0.5px -0.5px 1px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.6)',
                fontWeight: piece && piece.toLowerCase() !== piece ? 'normal' : 'normal',
                border: selectedPiece === piece ? '2px solid blue' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              {piece === null ? pieceSymbols['null'] : pieceSymbols[piece]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieceSelector;
