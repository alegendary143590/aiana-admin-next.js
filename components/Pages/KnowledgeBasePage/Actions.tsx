
import * as React from "react"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/EditNote"
import { useRouter } from "next/router"

const Actions = ({baseId, onDelete}) => {
  const router = useRouter();

    const handleEditClick = () => {
        router.push(`/knowledge/edit?base=${baseId}`)
    }

    const handleDeleteClick = () => {
      onDelete(baseId)
    }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing="2">
      <IconButton aria-label="delete" size="large" onClick={handleEditClick}>
        <EditIcon fontSize="inherit"/>
      </IconButton>
      <IconButton aria-label="delete" size="large" onClick={handleDeleteClick}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Stack>
      
  );
}

export default Actions