import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import {
  DescriptionOutlined as DescriptionIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
};
const CardModalHeader = ({ cardId }: Props) => {
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
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DescriptionIcon />
        <Typography sx={{ fontWeight: 500, fontSize: '1.2rem', pl: 1 }}>
          Opis
        </Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={handleToggleEditMode}>
          <EditIcon color="info" />
        </IconButton>
      </Box>
      {editMode ? (
        <EditableTextField
          multiline
          rows={10}
          sx={{ mx: 3, p: 1, backgroundColor: '#fff' }}
          onEdited={(newDescription: string) =>
            changeCardDescription(cardId, newDescription)
          }
          text={card.description}
        />
      ) : (
        <Box
          sx={{
            mx: 3,
            p: 1,
            code: {
              display: 'inline-block',
              width: '100%',
              backgroundColor: 'lightgray',
              borderRadius: '3px',
              p: 1,
            },
          }}
        >
          <ReactMarkdown>{card.description}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};
export default CardModalHeader;
