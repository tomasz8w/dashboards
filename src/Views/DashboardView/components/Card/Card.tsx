import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import NiceModal from '@ebay/nice-modal-react';
import { Edit as EditIcon } from '@mui/icons-material';
import { ButtonBase, Paper, Typography } from '@mui/material';
import { useDashboardStore, Card as TCard } from 'stores/dashboardStore';

import CardModal from '../CardModal';

type Props = {
  listId: string;
  cardId: string;
};

const Card = ({ listId, cardId }: Props) => {
  const { getCard, swapCardOrder, changeCardList } = useDashboardStore();
  const ref = useRef<HTMLDivElement>(null);

  const card = getCard(cardId);

  const showModal = () => {
    NiceModal.show(CardModal, { listId, cardId });
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'card',
    item: card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item: TCard) => {
      if (card === undefined) return;
      if (item.id === card.id) return;

      if (item.listId !== card.listId) {
        changeCardList(item.id, card.listId);
        return;
      }

      swapCardOrder(item.id, card.id);
    },
  });

  dragRef(dropRef(ref));

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
