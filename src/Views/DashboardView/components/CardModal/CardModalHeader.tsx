import React from 'react';

import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
  listId: string;
};
const CardModalHeader = ({ cardId, listId }: Props) => {
  const { changeCardTitle, getList, getCard, deleteCard } = useDashboardStore();

  const list = getList(listId);
  const card = getCard(cardId);

  if (!card) return null;
  if (!list) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ '*': { display: 'inline' }, mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {'Dashboards / '}
        </Typography>
        <Typography variant="body2">{list.title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <EditableTextField
          sx={{ fontWeight: 600, fontSize: '1.5rem' }}
          onEdited={(newTitle: string) => changeCardTitle(cardId, newTitle)}
          text={card.title}
        />
        <IconButton sx={{ ml: 'auto' }} onClick={() => deleteCard(card.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Chip label="Label1" size="small" color="success" />
        <Chip label="Test" size="small" />
        <Chip label="Ważne" size="small" color="info" />
      </Box>
    </Box>
  );
};
export default CardModalHeader;
