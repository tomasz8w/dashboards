import React from 'react';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Divider, Modal, Paper, Typography } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

import CardModalContent from './CardModalContent';
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
        maxHeight: '80vh',
        top: '15%',
        left: '30%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ flex: '0 1 auto', p: 3, borderRadius: '10px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CardModalHeader listId={listId} cardId={cardId} />
          <CardModalDescription cardId={cardId} />
          <Divider variant="fullWidth" />
          <CardModalContent cardId={cardId} />
          <Typography sx={{ ml: 'auto', px: 3 }} variant="caption">
            {`Data utworzenia: ${creationDate()}`}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
});
