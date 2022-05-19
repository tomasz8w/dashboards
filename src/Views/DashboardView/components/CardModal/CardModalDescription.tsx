import React from 'react';

import { DescriptionOutlined as DescriptionIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  cardId: string;
};
const CardModalHeader = ({ cardId }: Props) => {
  const { changeCardDescription, getCard } = useDashboardStore();

  const card = getCard(cardId);

  if (!card) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <DescriptionIcon />
        <Typography sx={{ fontWeight: 500, fontSize: '1.2rem', pl: 1 }}>
          Opis
        </Typography>
      </Box>
      <EditableTextField
        multiline
        rows={10}
        sx={{ mx: 3, p: 1, backgroundColor: '#F6F4F5' }}
        onEdited={(newDescription: string) =>
          changeCardDescription(cardId, newDescription)
        }
        text={card.description}
      />
    </Box>
  );
};
export default CardModalHeader;
