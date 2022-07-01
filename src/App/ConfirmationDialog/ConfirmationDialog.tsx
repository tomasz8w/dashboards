import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type Props = {
  open: boolean;
  content: string;
  callback: () => void;
  close: () => void;
};

const ConfirmationDialog = ({ open, content, close, callback }: Props) => {
  const handleCancel = () => {
    close();
  };
  const handleOk = () => {
    callback();
    close();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle id="dialog-title">Confirm choice</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
