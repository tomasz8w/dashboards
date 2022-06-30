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
        <Typography variant="subtitle2" sx={{ pl: 1 }}>
          Treść
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
          onEdited={(newContent: string) =>
            changeCardContent(cardId, newContent)
          }
          text={card.content}
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
          <ReactMarkdown>{card.content}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
};
export default CardModalContent;
