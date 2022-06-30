import React, { useState } from 'react';

import { Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
};
const CardModalDescription = ({ cardId }: Props) => {
  const { changeCardDescription, getCard } = useDashboardStore();
  const [editMode, setEditMode] = useState(false);

  const card = getCard(cardId);

  const handleToggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  if (!card) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Opis karty
        </Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={handleToggleEditMode}>
          <EditIcon />
        </IconButton>
      </Box>
      {editMode ? (
        <EditableTextField
          maxLength={255}
          sx={{
            p: 1,
            backgroundColor: 'grey.200',
          }}
          onEdited={(newDescription: string) =>
            changeCardDescription(cardId, newDescription)
          }
          text={card.description}
        />
      ) : (
        <Typography>{card.description}</Typography>
      )}
    </Box>
  );
};
export default CardModalDescription;
