import React from 'react';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Modal, Paper, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

import CardModalDescription from './CardModalDescription';
import CardModalHeader from './CardModalHeader';

type ModalProps = {
  listId: string;
  cardId: string;
};

export default NiceModal.create(({ listId, cardId }: ModalProps) => {
  const modal = useModal();
  const { getCard } = useDashboardStore();
  const card = getCard(cardId);

  if (!card) return null;

  const creationDate = () => {
    const date = new Date(card.creationDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Modal
      disableEscapeKeyDown
      open={modal.visible}
      onClose={modal.remove}
      sx={{
        width: '40%',
        maxHeight: '80%',
        top: '15%',
        left: '30%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <Paper sx={{ flex: '0 1 auto', p: 1, backgroundColor: '#F6F4F5' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mr: 1 }}>
          <CardModalHeader listId={listId} cardId={cardId} />
          <CardModalDescription cardId={cardId} />
          <Typography sx={{ ml: 'auto', px: 3 }} variant="caption">
            {`Data utworzenia: ${creationDate()}`}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
});
