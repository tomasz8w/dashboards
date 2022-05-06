import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Titlebar from './App/Titlebar';
import DashboardView from './Views/DashboardView';

const App = () => (
  <Router>
    <Titlebar />
    <Routes>
      <Route path="/" element={<DashboardView />} />
    </Routes>
  </Router>
);

export default App;
