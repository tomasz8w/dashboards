import React from 'react';

import { Box, Modal, Paper, Typography } from '@mui/material';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useDashboardStore } from 'stores/dashboardStore';
import EditableTextField from 'App/EditableTextField';

type ModalProps = {
  listId: string;
  cardId: string;
};

export default NiceModal.create(({ listId, cardId }: ModalProps) => {
  const modal = useModal();
  const { getCard, changeCardTitle } = useDashboardStore();
  const card = getCard(listId, cardId);

  if (!card) return null;

  const creationDate = () => {
    const date = new Date(card.creationDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

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
        <Box sx={{ display: 'flex' }}>
          <EditableTextField
            onEdited={(newTitle: string) =>
              changeCardTitle(listId, cardId, newTitle)
            }
            text={card.title}
          />
        </Box>

        <Typography variant="caption">
          {`Data utworzenia: ${creationDate()}`}
        </Typography>
      </Paper>
    </Modal>
  );
});
