import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
};
const CardModalContent = ({ cardId }: Props) => {
  const { changeCardContent, getCard } = useDashboardStore();
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Treść
        </Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={handleToggleEditMode}>
          <EditIcon />
        </IconButton>
      </Box>
      {editMode ? (
        <EditableTextField
          allowEmptyString
          multiline
          rows={10}
          sx={{ backgroundColor: 'grey.200' }}
          onEdited={(newContent: string) =>
            changeCardContent(cardId, newContent)
          }
          text={card.content}
        />
      ) : (
        <Box
          sx={{
            maxHeight: '40ch',
            overflowY: 'auto',
            width: '100%',
            code: {
              display: 'inline-block',
              whiteSpace: 'pre-wrap',
              width: '100%',
              backgroundColor: 'lightgray',
              borderRadius: '3px',
              p: 1,
            },
          }}
        >
          <ReactMarkdown>{card.content}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};
export default CardModalContent;
