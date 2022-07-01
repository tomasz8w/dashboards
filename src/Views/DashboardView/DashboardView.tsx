import React from 'react';
import { Navigate } from 'react-router-dom';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import ViewContainer from 'App/ViewContainer';
import { useDashboardStore } from 'stores/dashboardStore';

import List from './components/List';

const DashboardView = () => {
  const { getListsSorted, createList, selectedDashboard } = useDashboardStore();

  if (!selectedDashboard) return <Navigate to="/createDashboard" />;

  const lists = getListsSorted(selectedDashboard);

  const handleCreateList = () => {
    createList(selectedDashboard, 'New List');
  };

  return (
    <ViewContainer>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          gap: 1,
          alignItems: 'baseline',
          overflowX: 'auto',
        }}
      >
        {lists?.map((list) => (
          <List key={list.id} listId={list.id} />
        ))}

        <Button onClick={handleCreateList} startIcon={<AddIcon />}>
          New list
        </Button>
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
