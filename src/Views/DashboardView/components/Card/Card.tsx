import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Edit as EditIcon } from '@mui/icons-material';
import { Box, ButtonBase, Paper, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

import CardModal from '../CardModal';
import useDragAndDropCard from './useDragAndDropCard';

type Props = {
  listId: string;
  cardId: string;
  isNewCard: boolean;
  removeNewFlag: () => void;
};

const Card = ({ listId, cardId, isNewCard, removeNewFlag }: Props) => {
  const {
    getCard,
    swapCardOrder,
    changeCardList,
    changeCardTitle,
    deleteCard,
  } = useDashboardStore();

  const card = getCard(cardId);

  const { ref, isDragging } = useDragAndDropCard(
    card,
    changeCardList,
    swapCardOrder
  );

  const showModal = () => {
    if (isNewCard) return;
    NiceModal.show(CardModal, { listId, cardId });
  };

  const handleFirstEditEnd = (newName: string) => {
    removeNewFlag();
    if (newName === '') deleteCard(cardId);
    changeCardTitle(cardId, newName);
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
              opacity: 1,
            },
          },
          svg: {
            opacity: 0,
          },
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 'auto',
            textAlign: 'left',
          }}
        >
          {card && isNewCard ? (
            <EditableTextField
              text={card.title}
              placeholder="Enter card name"
              onEdited={handleFirstEditEnd}
              allowEmptyString
            />
          ) : (
            <Typography fontWeight={500}>{card?.title}</Typography>
          )}
          <EditIcon sx={{ fontSize: '1.2rem' }} />
        </Box>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'left' }}
        >
          {card?.description}
        </Typography>
      </Paper>
    </ButtonBase>
  );
};

export default Card;
