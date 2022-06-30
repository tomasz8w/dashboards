import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Edit as EditIcon } from '@mui/icons-material';
import { Box, ButtonBase, Paper, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

import CardModal from '../CardModal';
import useDragAndDropCard from './useDragAndDropCard';

type Props = {
  listId: string;
  cardId: string;
};

const Card = ({ listId, cardId }: Props) => {
  const { getCard, swapCardOrder, changeCardList } = useDashboardStore();

  const card = getCard(cardId);

  const { ref, isDragging } = useDragAndDropCard(
    card,
    changeCardList,
    swapCardOrder
  );

  const showModal = () => {
    NiceModal.show(CardModal, { listId, cardId });
  };

  return (
    <ButtonBase
      onClick={() => showModal()}
      sx={{ display: 'flex', width: '100%' }}
    >
      <Paper
        component="div"
        ref={ref}
        sx={{
          opacity: isDragging ? 0 : 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 'auto',

          ':hover': {
            backgroundColor: 'action.hover',
            svg: {
              display: 'inline',
            },
          },
          svg: {
            display: 'none',
          },
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 'auto',
          }}
        >
          <Typography fontWeight={500}>{card?.title}</Typography>
          <EditIcon sx={{ fontSize: '1.2rem' }} />
        </Box>
        <Typography variant="body2" sx={{ display: 'flex', textAlign: 'left' }}>
          {card?.description}
        </Typography>
      </Paper>
    </ButtonBase>
  );
};

export default Card;
