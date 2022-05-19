import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Titlebar from './App/Titlebar';
import DashboardView from './Views/DashboardView';

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <Router>
      <Titlebar />
      <Routes>
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </Router>
  </DndProvider>
);

export default App;
