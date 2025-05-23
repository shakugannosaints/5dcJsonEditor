import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditorProvider } from './context/EditorContext';
import TimelineList from './components/TimelineList';
import ControlPanel from './components/ControlPanel';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorProvider>
        <div className="App">
          <header className="App-header">
            <h1>国际象棋多时间线可视化编辑器</h1>
          </header>
          <ControlPanel />
          <TimelineList />
        </div>
      </EditorProvider>
    </DndProvider>
  );
}

export default App;
