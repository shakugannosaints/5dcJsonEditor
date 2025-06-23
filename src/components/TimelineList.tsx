import React, { useState } from 'react';
import { useEditor } from '../context/EditorContext';
import { useLocale } from '../context/LocaleContext';
import Timeline, { CopyModeContext } from './Timeline';

const TimelineList: React.FC = () => {
  const { state, dispatch } = useEditor();
  const { t } = useLocale();
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
    
    // 如果一个是0，另一个不是0，0排在中间
    if (numA === 0 && numB !== 0) return numB > 0 ? -1 : 1;
    if (numB === 0 && numA !== 0) return numA > 0 ? 1 : -1;
    
    return numA - numB;
  });

  // 找到下一个可用的时间线ID
  const getNextTimelineId = (isPositive: boolean) => {
    const existingIds = Object.keys(timelines);
    let nextNum = isPositive ? 1 : -1;
    
    while (existingIds.includes(`${nextNum}L`)) {
      nextNum = isPositive ? nextNum + 1 : nextNum - 1;
    }
    
    return `${nextNum}L`;
  };

  const handleAddTimeline = (id: string) => {
    dispatch({
      type: 'ADD_TIMELINE',
      payload: { id }
    });
  };

  const handleAddPositiveTimeline = () => {
    const id = getNextTimelineId(true);
    handleAddTimeline(id);
  };

  const handleAddNegativeTimeline = () => {
    const id = getNextTimelineId(false);
    handleAddTimeline(id);
  };

  const handleCancelCopy = () => {
    setCopyMode(false);
    setSourceBoardInfo(null);
  };

  return (
    <div className="timeline-list" style={{ padding: '20px' }}>
      <div className="timeline-controls" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleAddNegativeTimeline}>{t.timeline.addNegativeTimeline}</button>
        <button onClick={() => handleAddTimeline('0L')}>{t.timeline.addZeroTimeline}</button>
        <button onClick={() => handleAddTimeline('+0L')}>{t.timeline.addPlusZeroTimeline}</button>
        <button onClick={() => handleAddTimeline('-0L')}>{t.timeline.addMinusZeroTimeline}</button>
        <button onClick={handleAddPositiveTimeline}>{t.timeline.addPositiveTimeline}</button>
        
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
            <span style={{ marginRight: '10px' }}>{t.timeline.copyMode}：{t.timeline.clickToCopy}</span>
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
              {t.timeline.exitCopyMode}
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
