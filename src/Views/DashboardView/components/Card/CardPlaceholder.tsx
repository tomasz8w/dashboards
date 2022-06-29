import React from 'react';
import { useDrop } from 'react-dnd';

import { Paper } from '@mui/material';
import { Card as CardModel } from 'models';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  listId: string;
};

const CardPlaceholder = ({ listId }: Props) => {
  const { changeCardList } = useDashboardStore();

  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item: CardModel) => {
      changeCardList(item.id, listId);
    },
  });

  return (
    <Paper
      component="div"
      ref={dropRef}
      sx={{
        opacity: 0,
        position: 'absolute',
        width: '100%',
        p: 1,
      }}
    >
      Drop here
    </Paper>
  );
};

export default CardPlaceholder;
