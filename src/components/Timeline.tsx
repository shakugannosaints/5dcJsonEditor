import React, { useState, useContext, createContext } from 'react';
import { Timeline as TimelineType } from '../types';
import Board from './Board';
import { useEditor } from '../context/EditorContext';

// 创建一个上下文来共享复制模式状态
export const CopyModeContext = createContext<{
  copyMode: boolean;
  setCopyMode: (mode: boolean) => void;
  sourceBoardInfo: { timelineId: string; boardPosition: number } | null;
  setSourceBoardInfo: (info: { timelineId: string; boardPosition: number } | null) => void;
}>({
  copyMode: false,
  setCopyMode: () => {},
  sourceBoardInfo: null,
  setSourceBoardInfo: () => {}
});

interface TimelineProps {
  timeline: TimelineType;
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const { dispatch } = useEditor();
  const { id, boards } = timeline;
  const { copyMode, sourceBoardInfo, setSourceBoardInfo, setCopyMode } = useContext(CopyModeContext);

  const handleAddBoard = () => {
    dispatch({
      type: 'ADD_BOARD',
      payload: {
        timelineId: id,
        position: boards.length
      }
    });
  };

  const handleRemoveBoard = (position: number) => {
    dispatch({
      type: 'REMOVE_BOARD',
      payload: {
        timelineId: id,
        position
      }
    });
  };

  const handleCopyBoard = (position: number) => {
    // 设置复制模式和源棋盘信息
    setCopyMode(true);
    setSourceBoardInfo({ timelineId: id, boardPosition: position });
  };

  const handlePasteBoard = (position: number) => {
    if (copyMode && sourceBoardInfo) {
      // 执行复制操作
      dispatch({
        type: 'COPY_BOARD',
        payload: {
          sourceTimelineId: sourceBoardInfo.timelineId,
          sourcePosition: sourceBoardInfo.boardPosition,
          targetTimelineId: id,
          targetPosition: position
        }
      });
      
      // 复制完成后退出复制模式
      setCopyMode(false);
      setSourceBoardInfo(null);
    }
  };

  return (
    <div className="timeline" style={{ margin: '15px 0', padding: '10px', border: '1px solid #666', borderRadius: '5px' }}>
      <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>时间线: {id}</h3>
        <button onClick={() => dispatch({ type: 'REMOVE_TIMELINE', payload: { id } })}>
          删除时间线
        </button>
      </div>
      <div className="boards-container" style={{ display: 'flex', overflowX: 'auto', padding: '10px 0' }}>
        {boards.map((board, index) => (
          <div 
            key={board ? board.id : `empty-${index}`} 
            className="board-wrapper" 
            style={{ position: 'relative' }}
            onClick={() => copyMode && handlePasteBoard(index)}
          >
            {board ? (
              <>
                <Board board={board} timelineId={id} boardPosition={index} />
                <div className="board-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                  <button onClick={() => handleCopyBoard(index)} style={{ marginRight: '5px' }}>
                    复制
                  </button>
                  <button onClick={() => handleRemoveBoard(index)} style={{ marginRight: '5px' }}>
                    删除
                  </button>
                </div>
              </>
            ) : (
              <div 
                className="empty-board" 
                style={{ 
                  width: '200px', 
                  height: '200px', 
                  border: copyMode ? '2px dashed blue' : '1px dashed #999', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  margin: '10px',
                  cursor: copyMode ? 'pointer' : 'default',
                  backgroundColor: copyMode ? 'rgba(0, 0, 255, 0.05)' : 'transparent'
                }}
              >
                {copyMode ? '点击此处粘贴棋盘' : '空位置'}
              </div>
            )}
          </div>
        ))}
        <div 
          className="add-board" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '10px',
            cursor: copyMode ? 'pointer' : 'default',
          }}
          onClick={() => copyMode && handlePasteBoard(boards.length)}
        >
          {copyMode ? (
            <div style={{ 
              padding: '10px', 
              border: '2px dashed blue',
              backgroundColor: 'rgba(0, 0, 255, 0.05)',
              borderRadius: '4px'
            }}>
              点击此处粘贴棋盘
            </div>
          ) : (
            <button onClick={handleAddBoard} style={{ padding: '10px', cursor: 'pointer' }}>
              添加棋盘
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
