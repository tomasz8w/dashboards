import React from 'react';

import {
  RestartAlt as RestartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

const TitlebarIcons = () => {
  const {
    selectedDashboard,
    resetDashboard,
    deleteDashboard,
    setSelectedDashboard,
  } = useDashboardStore();

  if (!selectedDashboard) return null;

  return (
    <>
      <Tooltip title="Add dashboard">
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => setSelectedDashboard('')}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Reset dashboard">
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => resetDashboard(selectedDashboard)}
        >
          <RestartIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete dashboard">
        <IconButton
          color="inherit"
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          onClick={() => deleteDashboard(selectedDashboard)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TitlebarIcons;
