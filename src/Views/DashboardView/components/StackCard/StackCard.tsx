import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Paper } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

import Card from '../Card';
import StackCardHeader from './StackCardHeader';

type Props = {
  listId: number;
};

const StackCard = ({ listId }: Props) => {
  const { getList, addCard } = useDashboardStore();

  const list = getList(listId);

  const handleAddCard = () => {
    addCard(listId, 'New card');
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        flex: 'auto',
        minWidth: '200px',
        maxWidth: '300px',
        justifyContent: 'center',
      }}
    >
      {list && (
        <>
          <StackCardHeader title={list.title} listId={listId} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              p: 1,
              alignItems: 'center',
            }}
          >
            {list.cards.map((card) => (
              <Card key={card.id} listId={listId} cardId={card.id} />
            ))}

            <Button startIcon={<AddIcon />} onClick={handleAddCard}>
              New card
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default StackCard;
