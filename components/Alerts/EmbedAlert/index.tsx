import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EmbedAlert({open, setOpen, description, handleCopy}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"To embed your chatbot onto your website, paste this snippet into your website's HTML file"}
        </DialogTitle>
        <DialogContent className="bg-gray-300 m-3 rounded-sm flex justify-center items-center">
          <DialogContentText id="alert-dialog-description" className="font-bold flex items-center">
            <div className="font-bold mt-[20px]"> {description}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error" className='bg-[#d32f2f] text-white'>Cancel</Button>
          <Button onClick={handleCopy} autoFocus variant="contained" className='bg-[#1976d2]'>
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}