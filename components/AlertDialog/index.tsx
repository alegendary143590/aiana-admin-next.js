import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertDialog({ title, description, handleAgree, handleDisagree, open, setOpen }) {
  const handleClose = () => {
      setOpen(false);  // Use the passed setOpen to close dialog
  };

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {description}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleDisagree}>No</Button>
              <Button onClick={handleAgree} autoFocus>
                  Yes
              </Button>
          </DialogActions>
      </Dialog>
  );
}

export default AlertDialog;
