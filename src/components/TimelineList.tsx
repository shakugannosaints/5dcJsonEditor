import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import Timeline, { CopyModeContext } from './Timeline';

const TimelineList: React.FC = () => {
  const { state, dispatch } = useEditor();
  const { timelines } = state;
  const [copyMode, setCopyMode] = useState(false);
  const [sourceBoardInfo, setSourceBoardInfo] = useState<{ timelineId: string; boardPosition: number } | null>(null);

  // 对时间线进行排序：负数在上，正数在下
  const sortedTimelineIds = Object.keys(timelines).sort((a, b) => {
    // 处理特殊的+0L和-0L
    if (a === '+0L') return 1;
    if (a === '-0L') return -1;
    if (b === '+0L') return -1;
    if (b === '-0L') return 1;
    
    // 处理普通的时间线ID
    const numA = parseInt(a.replace('L', ''));
    const numB = parseInt(b.replace('L', ''));
    return numA - numB;
  });

  const handleAddTimeline = (id: string) => {
    dispatch({
      type: 'ADD_TIMELINE',
      payload: { id }
    });
  };

  const handleCancelCopy = () => {
    setCopyMode(false);
    setSourceBoardInfo(null);
  };

  return (
    <div className="timeline-list" style={{ padding: '20px' }}>
      <div className="timeline-controls" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => handleAddTimeline('-1L')}>添加负时间线</button>
        <button onClick={() => handleAddTimeline('0L')}>添加零时间线</button>
        <button onClick={() => handleAddTimeline('+0L')}>添加+0L时间线</button>
        <button onClick={() => handleAddTimeline('-0L')}>添加-0L时间线</button>
        <button onClick={() => handleAddTimeline('1L')}>添加正时间线</button>
        
        {copyMode && (
          <div style={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(0, 0, 255, 0.1)', 
            padding: '5px 10px', 
            borderRadius: '4px',
            border: '1px solid blue'
          }}>
            <span style={{ marginRight: '10px' }}>复制模式：请点击目标位置完成复制</span>
            <button 
              onClick={handleCancelCopy}
              style={{ 
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              取消复制
            </button>
          </div>
        )}
      </div>
      
      <CopyModeContext.Provider value={{ copyMode, setCopyMode, sourceBoardInfo, setSourceBoardInfo }}>
        {sortedTimelineIds.map(id => (
          <Timeline key={id} timeline={timelines[id]} />
        ))}
      </CopyModeContext.Provider>
    </div>
  );
};

export default TimelineList;
