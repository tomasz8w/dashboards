import React, { useState } from 'react';

import {
  Check as CheckIcon,
  Clear as ClearIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useDashboardStore } from 'stores/dashboardStore';

type Props = {
  title: string;
  listId: number;
};

const StackCardHeader = ({ title, listId }: Props) => {
  const { deleteList, changeListTitle } = useDashboardStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [titleText, setTitleText] = useState('');

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteList = () => {
    deleteList(listId);
  };

  const handleEnterEditMode = () => {
    setEditMode(true);
    setTitleText(title);
  };
  const handleAbortEdit = () => {
    setEditMode(false);
  };
  const handleAcceptEdit = () => {
    setEditMode(false);
    changeListTitle(listId, titleText);
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
      {editMode ? (
        <>
          <TextField
            id="title"
            value={titleText}
            variant="standard"
            onChange={(e) => setTitleText(e.target.value)}
          />
          <IconButton onClick={handleAbortEdit}>
            <ClearIcon />
          </IconButton>
          <IconButton onClick={handleAcceptEdit}>
            <CheckIcon />
          </IconButton>
        </>
      ) : (
        <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
      )}

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
        <MenuItem onClick={handleEnterEditMode}>
          <EditIcon sx={{ mr: 1 }} />
          Rename
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
