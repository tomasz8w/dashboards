import React from 'react';

import {
  AssignmentOutlined as AssignmentIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
  listId: string;
};
const CardModalHeader = ({ cardId, listId }: Props) => {
  const { changeCardTitle, getList, getCard } = useDashboardStore();

  const list = getList(listId);
  const card = getCard(cardId);

  if (!card) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AssignmentIcon />
        <EditableTextField
          sx={{ fontWeight: 500, fontSize: '1.5rem', pl: 1 }}
          onEdited={(newTitle: string) => changeCardTitle(cardId, newTitle)}
          text={card.title}
        />
        <IconButton sx={{ ml: 'auto' }}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
      <Typography
        sx={{ px: 4 }}
        variant="caption"
      >{`Na liście: ${list?.title}`}</Typography>
    </Box>
  );
};
export default CardModalHeader;
