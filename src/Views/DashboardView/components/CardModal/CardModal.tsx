import React from 'react';

import { Modal, Paper, Typography } from '@mui/material';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useDashboardStore } from 'stores/dashboardStore';

type ModalProps = {
  listId: string;
  cardId: string;
};

export default NiceModal.create(({ listId, cardId }: ModalProps) => {
  const { getCard } = useDashboardStore();

  const card = getCard(listId, cardId);

  if (!card) return null;

  const creationDate = () => {
    const date = new Date(card.creationDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const modal = useModal();
  return (
    <Modal
      open={modal.visible}
      onClose={modal.remove}
      sx={{
        width: '40%',
        height: '70%',
        top: '15%',
        left: '30%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ flex: 1, p: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'left' }}>
          {card.title}
        </Typography>

        <Typography variant="caption">
          {`Data utworzenia: ${creationDate()}`}
        </Typography>
      </Paper>
    </Modal>
  );
});
