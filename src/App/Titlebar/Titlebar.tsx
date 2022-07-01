import React from 'react';

import { AppBar, Toolbar } from '@mui/material';

import DashboardSelect from './DashboardSelect';
import TitlebarIcons from './TitlebarIcons';

const Titlebar = () => (
  <AppBar position="static">
    <Toolbar>
      <DashboardSelect />
      <TitlebarIcons />
    </Toolbar>
  </AppBar>
);

export default Titlebar;
