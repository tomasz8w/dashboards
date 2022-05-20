import React from 'react';

import { RestartAlt as RestartIcon } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

const Titlebar = () => {
  const { resetStore } = useDashboardStore();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => resetStore()}
        >
          <RestartIcon />
        </IconButton>
        <Typography variant="h6">Dashboards</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Titlebar;
