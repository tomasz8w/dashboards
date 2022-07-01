import React, { useRef, useState } from 'react';

import {
  RestartAlt as RestartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import ConfirmationDialog from 'App/ConfirmationDialog';
import { useDashboardStore } from 'stores/dashboardStore';

const TitlebarIcons = () => {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const dialogContent = useRef<string>('');
  const callback = useRef<() => void>();
  const {
    selectedDashboard,
    resetDashboard,
    deleteDashboard,
    setSelectedDashboard,
  } = useDashboardStore();

  if (!selectedDashboard) return null;

  const handleDeleteDashboard = () => {
    dialogContent.current =
      'Are you sure that you want to delete current dashboard?';
    callback.current = () => deleteDashboard(selectedDashboard);
    setConfirmationDialogOpen(true);
  };

  const handleResetDashboard = () => {
    dialogContent.current =
      'Are you sure that you want to reset current dashboard and delete all cards and lists?';
    callback.current = () => resetDashboard(selectedDashboard);
    setConfirmationDialogOpen(true);
  };

  return (
    <>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        content={dialogContent.current}
        close={() => setConfirmationDialogOpen(false)}
        callback={() => callback.current && callback.current()}
      />
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
          onClick={handleResetDashboard}
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
          onClick={handleDeleteDashboard}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TitlebarIcons;
