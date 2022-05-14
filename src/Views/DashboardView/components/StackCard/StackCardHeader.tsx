import React, { useState } from 'react';

import {
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';
import EditableTextField from 'App/EditableTextField';

type Props = {
  title: string;
  listId: string;
};

const StackCardHeader = ({ title, listId }: Props) => {
  const { deleteList, changeListTitle } = useDashboardStore();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteList = () => {
    deleteList(listId);
  };

  const isOpen = !!anchorEl;

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <EditableTextField
        text={title}
        onEdited={(newTitle) => changeListTitle(listId, newTitle)}
      />
      <IconButton onClick={handleOpenMenu}>
        <MoreIcon />
      </IconButton>
      <Menu
        open={isOpen}
        onClose={handleCloseMenu}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={handleDeleteList}>
          <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StackCardHeader;
