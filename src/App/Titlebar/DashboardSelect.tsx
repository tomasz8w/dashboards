import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

const DashboardSelect = () => {
  const navigate = useNavigate();
  const { dashboards, selectedDashboard, setSelectedDashboard } =
    useDashboardStore();

  const handleDashboardSelected = (event: SelectChangeEvent<string>) => {
    setSelectedDashboard(event.target.value);
    navigate('/');
  };

  return (
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
  );
};

export default DashboardSelect;
