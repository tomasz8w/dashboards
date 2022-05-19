import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Paper } from '@mui/material';
import { useDashboardStore, List } from 'stores/dashboardStore';

import Card from '../Card';
import StackCardHeader from './StackCardHeader';

type Props = {
  listId: string;
};

const StackCard = ({ listId }: Props) => {
  const { getList, addCard, swapListOrder } = useDashboardStore();
  const ref = useRef<HTMLDivElement>(null);

  const list = getList(listId);

  const handleAddCard = () => {
    addCard(listId, 'New card');
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'stack-card',
    item: list,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: 'stack-card',
    hover: (item: List) => {
      if (list === undefined) return;
      if (item.id === list.id) return;

      swapListOrder(item.id, list.id);
    },
  });

  dragRef(dropRef(ref));

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
    </Paper>
  );
};

export default StackCard;
