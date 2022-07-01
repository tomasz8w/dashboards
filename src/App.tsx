import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import Titlebar from './App/Titlebar';
import theme from './theme';
import CreateDashboardView from './Views/CreateDashboardView';
import DashboardView from './Views/DashboardView';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DndProvider backend={HTML5Backend}>
      <NiceModal.Provider>
        <Router>
          <Titlebar />
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/createDashboard" element={<CreateDashboardView />} />
          </Routes>
        </Router>
      </NiceModal.Provider>
    </DndProvider>
  </ThemeProvider>
);

export default App;
