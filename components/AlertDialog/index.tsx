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
              <Button onClick={handleDisagree} className='bg-gray-500 text-white hover:bg-gray-200'>No</Button>
              <Button onClick={handleAgree} autoFocus className='bg-red-500 hover:bg-gray-200 text-white'>
                  Yes
              </Button>
          </DialogActions>
      </Dialog>
  );
}

export default AlertDialog;
