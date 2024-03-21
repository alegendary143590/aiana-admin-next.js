
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';

export default function IconButtonSizes() {
  return (
      <IconButton aria-label="delete" size="large">
        <PublishIcon fontSize="inherit" />
      </IconButton>
  );
}