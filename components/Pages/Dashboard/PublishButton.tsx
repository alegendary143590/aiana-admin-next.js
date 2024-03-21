
import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';

export default function IconButtonSizes() {
  return (
      <IconButton aria-label="delete" size="large">
        <PublishIcon fontSize="inherit" />
      </IconButton>
  );
}