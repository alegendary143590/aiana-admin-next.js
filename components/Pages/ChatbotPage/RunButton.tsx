
import * as React from "react"
import IconButton from "@mui/material/IconButton"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export default function IconButtonSizes() {
  return (
      <IconButton aria-label="delete" size="large">
        <PlayArrowIcon fontSize="inherit" />
      </IconButton>
  );
}