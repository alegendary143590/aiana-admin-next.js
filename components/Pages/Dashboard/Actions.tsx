
import * as React from "react"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/EditNote"

export default function IconButtonSizes() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing="2">
      <IconButton aria-label="delete" size="large">
        <EditIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="delete" size="large">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Stack>
      
  );
}