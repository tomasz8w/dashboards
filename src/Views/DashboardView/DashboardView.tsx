import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import ViewContainer from 'App/ViewContainer';
import { useDashboardStore } from 'stores/dashboardStore';

import StackCard from './components/StackCard';

const DashboardView = () => {
  const { getListsSorted, createList } = useDashboardStore();

  const lists = getListsSorted();

  const handleCreateList = () => {
    createList('New List');
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
          <StackCard key={list.id} listId={list.id} />
        ))}

        <Button onClick={handleCreateList} startIcon={<AddIcon />}>
          New list
        </Button>
      </Box>
    </ViewContainer>
  );
};

export default DashboardView;
