import React from 'react';
import { useEditor } from '../context/EditorContext';
import Timeline from './Timeline';

const TimelineList: React.FC = () => {
  const { state, dispatch } = useEditor();
  const { timelines } = state;

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

  return (
    <div className="timeline-list" style={{ padding: '20px' }}>
      <div className="timeline-controls" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => handleAddTimeline('-1L')}>添加负时间线</button>
        <button onClick={() => handleAddTimeline('0L')}>添加零时间线</button>
        <button onClick={() => handleAddTimeline('+0L')}>添加+0L时间线</button>
        <button onClick={() => handleAddTimeline('-0L')}>添加-0L时间线</button>
        <button onClick={() => handleAddTimeline('1L')}>添加正时间线</button>
      </div>
      
      {sortedTimelineIds.map(id => (
        <Timeline key={id} timeline={timelines[id]} />
      ))}
    </div>
  );
};

export default TimelineList;
