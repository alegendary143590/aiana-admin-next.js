import React, { useState } from "react"
import {
  Grid,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/InfoRounded"
import { isValidUrl } from "./validation" // Import your URL validation library here

const Website = () => {
  const [urlInputValue, setUrlInputValue] = useState("")
  const [urls, setUrls] = useState([])

  const handleUrlAdd = () => {
    if (isValidUrl(urlInputValue)) {
      setUrls([...urls, urlInputValue])
      setUrlInputValue("")
    } else {
      alert("Invalid URL. Please enter a valid URL.")
    }
  }

  const handleDeleteUrl = (index) => {
    const updatedUrls = urls.filter((url, i) => i !== index)
    setUrls(updatedUrls)
  }

  return (
    <Paper elevation={3} className="w-[700px] h-full p-5">
      <Grid container className="p-5">
        <Typography className="bg-[#e6f2ff] w-full mr-5 ml-5 p-3" sx={{ lineHeight: "2" }}>
          <InfoIcon className="text-[#33adff] mr-2 mb-1" />
          Add URLs to build your chatbot&apos;s knowledge base. These URLs help train your chatbot
          to answer questions accurately.
        </Typography>
      </Grid>
      <Grid container spacing={3} className="mt-5">
        <Grid item xs={2} className="flex justify-end items-center">
          <Typography>Enter URL:</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            type="text"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            className="w-full"
            id="urlInput"
          />
        </Grid>
        <Grid item xs={2}>
          <Button className="bg-[#0099ff]" variant="contained" onClick={handleUrlAdd}>
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="column">
        <Grid item xs={8}>
          <List className="h-[350px] overflow-y-auto border-solid border border-gray-300 rounded-md mt-5 p-3">
            {urls.map((url, index) => (
              <ListItem key={url} className="border-b border-gray-300">
                <ListItemText primary={url} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUrl(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={4} className="flex justify-center">
          <Button className="bg-[#0099ff]" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Website
