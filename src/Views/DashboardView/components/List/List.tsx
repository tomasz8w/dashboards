import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Paper } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

import Card from '../Card';
import CardPlaceholder from '../Card/CardPlaceholder';
import ListHeader from './ListHeader';
import useDragAndDropList from './useDragAndDropList';

type Props = {
  listId: string;
};

const List = ({ listId }: Props) => {
  const { getList, addCard, swapListOrder, getListCards } = useDashboardStore();

  const list = getList(listId);
  const cards = getListCards(listId);

  const { ref, isDragging } = useDragAndDropList(list, swapListOrder);

  const handleAddCard = () => {
    addCard(listId, 'New card');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flex: 1,
        minWidth: '200px',
        maxWidth: '300px',
        backgroundColor: isDragging ? '#84977a' : 'transparent',
      }}
    >
      <Paper
        ref={ref}
        elevation={2}
        sx={{
          opacity: isDragging ? 0 : 1,
          transition: 'background-color 250ms',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          flex: 'auto',
          justifyContent: 'center',
        }}
      >
        {list && (
          <>
            <ListHeader title={list.title} listId={listId} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                p: 1,
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {cards.length === 0 && <CardPlaceholder listId={listId} />}
              {cards.map((card) => (
                <Card key={card.id} listId={listId} cardId={card.id} />
              ))}

              <Button startIcon={<AddIcon />} onClick={handleAddCard}>
                New card
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Paper>
  );
};

export default List;
