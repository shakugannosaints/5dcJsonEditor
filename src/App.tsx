import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditorProvider } from './context/EditorContext';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import TimelineList from './components/TimelineList';
import ControlPanel from './components/ControlPanel';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

function AppContent() {
  const { t } = useLocale();
  
  return (
    <DndProvider backend={HTML5Backend}>
      <EditorProvider>
        <div className="App">
          <header className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{t.appTitle}</h1>
            <LanguageSwitcher />
          </header>
          <ControlPanel />
          <TimelineList />
        </div>
      </EditorProvider>
    </DndProvider>
  );
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}

export default App;
