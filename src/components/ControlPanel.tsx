import React from 'react';
import { useEditor } from '../context/EditorContext';
import { useLocale } from '../context/LocaleContext';

const ControlPanel: React.FC = () => {
  const { state, dispatch } = useEditor();
  const { t } = useLocale();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUndo = () => {
    dispatch({ type: 'UNDO' });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO' });
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        dispatch({ type: 'IMPORT_JSON', payload: json });
      } catch (error) {
        alert(t.metadata.importFailed);
        console.error('导入失败：', error);
      }
    };
    reader.readAsText(file);
    
    // 重置文件输入，以便可以重新选择同一个文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
    // 创建导出的JSON对象
    const exportData = {
      Name: state.name,
      Author: state.author,
      Timelines: {} as Record<string, (string | null)[]>,
      CosmeticTurnOffset: state.cosmeticTurnOffset
    };

    // 转换时间线数据
    Object.entries(state.timelines).forEach(([id, timeline]) => {
      exportData.Timelines[id] = timeline.boards.map(board => board ? board.fen : null);
    });

    // 创建并下载JSON文件
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileName = `${state.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  const handleUpdateMetadata = () => {
    const name = prompt(t.metadata.enterGameName, state.name);
    const author = prompt(t.metadata.enterAuthorName, state.author);
    const cosmeticTurnOffset = prompt(t.metadata.enterTurnOffset, state.cosmeticTurnOffset.toString());
    
    dispatch({
      type: 'UPDATE_METADATA',
      payload: {
        name: name || undefined,
        author: author || undefined,
        cosmeticTurnOffset: cosmeticTurnOffset ? parseInt(cosmeticTurnOffset) : undefined
      }
    });
  };

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    if (!isNaN(newSize) && newSize >= 1 && newSize <= 999) {
      dispatch({
        type: 'SET_BOARD_SIZE',
        payload: { size: newSize }
      });
    }
  };

  return (
    <div className="control-panel" style={{ 
      padding: '15px', 
      backgroundColor: '#f5f5f5', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="metadata" style={{ flex: 1 }}>
        <h2 style={{ margin: '0 0 5px 0' }}>{state.name}</h2>
        <p style={{ margin: 0 }}>{t.controlPanel.author}: {state.author}</p>
      </div>
      
      <div className="board-size-control" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        marginRight: '20px' 
      }}>
        <label htmlFor="board-size-input" style={{ fontWeight: 'bold' }}>
          {t.controlPanel.boardSize}:
        </label>
        <input
          id="board-size-input"
          type="number"
          min="1"
          max="999"
          value={state.boardSize}
          onChange={handleBoardSizeChange}
          style={{
            padding: '5px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            width: '80px',
            textAlign: 'center'
          }}
        />
        <span style={{ fontSize: '0.9em', color: '#666' }}>
          {t.controlPanel.boardSizeRange}
        </span>
      </div>
      
      <div className="controls" style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleUpdateMetadata}>{t.controlPanel.editMetadata}</button>
        <button onClick={handleUndo} disabled={state.currentHistoryIndex <= 0}>{t.controlPanel.undo}</button>
        <button onClick={handleRedo} disabled={state.currentHistoryIndex >= state.history.length - 1}>{t.controlPanel.redo}</button>
        <button onClick={handleImport}>{t.controlPanel.import}</button>
        <button onClick={handleExport}>{t.controlPanel.export}</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
