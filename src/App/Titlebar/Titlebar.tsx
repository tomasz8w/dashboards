import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RestartAlt as RestartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  AppBar,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
} from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

const Titlebar = () => {
  const navigate = useNavigate();
  const {
    resetDashboard,
    deleteDashboard,
    dashboards,
    selectedDashboard,
    setSelectedDashboard,
  } = useDashboardStore();

  const handleDashboardSelected = (event: SelectChangeEvent<string>) => {
    setSelectedDashboard(event.target.value);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <FormControl sx={{ mr: 'auto' }}>
          {dashboards.length > 0 && (
            <Select
              sx={{
                fontSize: '1.5rem',
                color: 'primary.contrastText',
                svg: {
                  color: 'primary.contrastText',
                },
              }}
              disableUnderline
              displayEmpty
              variant="standard"
              onChange={(event) => handleDashboardSelected(event)}
              value={selectedDashboard}
            >
              {dashboards.map((dashboard) => (
                <MenuItem key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        {selectedDashboard && (
          <>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              sx={{ mr: 2 }}
              onClick={() => setSelectedDashboard('')}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              sx={{ mr: 2 }}
              onClick={() => resetDashboard(selectedDashboard)}
            >
              <RestartIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              sx={{ mr: 2 }}
              onClick={() => deleteDashboard(selectedDashboard)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Titlebar;
