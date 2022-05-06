import React from 'react';
import NiceModal from '@ebay/nice-modal-react';

import { Edit as EditIcon } from '@mui/icons-material';
import { ButtonBase, Paper, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';
import CardModal from '../CardModal';

type Props = {
  listId: string;
  cardId: string;
};

const Card = ({ listId, cardId }: Props) => {
  const { getCard } = useDashboardStore();

  const card = getCard(listId, cardId);

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
        sx={{
          display: 'flex',
          flex: 'auto',
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
          p: 1,
          backgroundColor: 'action.disabledBackground',
        }}
      >
        <Typography>{card?.title}</Typography>
        <EditIcon sx={{ fontSize: '1.2rem' }} />
      </Paper>
    </ButtonBase>
  );
};

export default Card;
