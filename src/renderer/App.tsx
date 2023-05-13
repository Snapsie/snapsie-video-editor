import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Editor from './Editor';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Editor />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}
