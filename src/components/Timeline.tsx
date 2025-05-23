import React from 'react';
import { Timeline as TimelineType } from '../types';
import Board from './Board';
import { useEditor } from '../context/EditorContext';

interface TimelineProps {
  timeline: TimelineType;
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const { dispatch } = useEditor();
  const { id, boards } = timeline;

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
          <div key={board ? board.id : `empty-${index}`} className="board-wrapper" style={{ position: 'relative' }}>
            {board ? (
              <>
                <Board board={board} timelineId={id} boardPosition={index} />
                <div className="board-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                  <button onClick={() => handleRemoveBoard(index)} style={{ marginRight: '5px' }}>
                    删除
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-board" style={{ width: '200px', height: '200px', border: '1px dashed #999', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                空位置
              </div>
            )}
          </div>
        ))}
        <div className="add-board" style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <button onClick={handleAddBoard} style={{ padding: '10px', cursor: 'pointer' }}>
            添加棋盘
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
