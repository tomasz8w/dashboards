import React from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  listId: number;
  cardId: number;
};

const Card = ({ listId, cardId }: Props) => {
  const { getCard } = useDashboardStore();

  const card = getCard(listId, cardId);

  return (
    <Paper
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ':hover': {
          backgroundColor: 'action.hover',
          svg: {
            display: 'inline',
          },
        },
        svg: {
          display: 'none',
        },
        width: '100%',
        p: 1,
        backgroundColor: 'action.disabledBackground',
      }}
    >
      <Typography>
        {card?.title}, id: {card?.id}
      </Typography>
      <EditIcon sx={{ fontSize: '1.2rem' }} />
    </Paper>
  );
};

export default Card;
