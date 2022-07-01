import React, { useState } from 'react';

import {
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  RestartAlt as RestartIcon,
} from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import EditableTextField from 'App/EditableTextField';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  title: string;
  listId: string;
};

const StackCardHeader = ({ title, listId }: Props) => {
  const { deleteList, changeListTitle, clearList } = useDashboardStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteList = () => {
    deleteList(listId);
  };
  const handleClearList = () => {
    clearList(listId);
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
        sx={{ fontSize: '1.2rem', fontWeight: '500' }}
        text={title}
        onEdited={(newTitle) => changeListTitle(listId, newTitle)}
        autoFocus={false}
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
        <MenuItem onClick={handleClearList}>
          <RestartIcon sx={{ mr: 1, color: 'warning.main' }} />
          Clear list
        </MenuItem>
        <MenuItem onClick={handleDeleteList}>
          <DeleteIcon sx={{ mr: 1, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StackCardHeader;
