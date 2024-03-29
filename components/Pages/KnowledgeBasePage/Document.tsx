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
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/InfoRounded"

const Document = () => {
  const [documents, setDocuments] = useState([])
  const [nameInputValue, setNameInputValue] = useState("")

  const handleDocumentChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    const newDocs = Array.from(fileList).filter((file) => allowedTypes.includes(file.type))

    setDocuments([...documents, ...newDocs])
  }

  const handleDeleteDocument = (index) => {
    const updatedDocuments = documents.filter((doc, i) => i !== index)
    setDocuments(updatedDocuments)
  }

  return (
    <Paper elevation={3} className="w-[700px] h-full p-5">
      <Grid container spacing={2} className="mt-2">
        <Grid item xs={4} className="flex justify-end items-center">
          <Typography>Name:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
            className="w-full"
            id="urlInput"
          />
        </Grid>
      </Grid>
      <Grid container className="p-5">
        <Typography className="bg-[#e6f2ff] w-full mr-5 ml-5 p-3" sx={{ lineHeight: "2" }}>
          <InfoIcon className="text-[#33adff] mr-2 mb-1" />
          Build your chatbot&apos;s knowledge base by uploading documents. These documents train
          your chatbot to answer questions accurately.
        </Typography>
      </Grid>
      <Grid container spacing={2} className="flex justify-center items-center">
        <Grid item>
          <Button
            component="label"
            className="bg-transparent text-gray-600 w-[200px] flex flex-col h-[150px] border-dashed border-2 border-gray-200"
            tabIndex={-1}
            style={{ textTransform: "none" }}
          >
            <CloudUploadIcon className="w-10 h-10" />
            <Typography className="font-bold text-black text-[16px] text-center">
              Drop files here or click to upload
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.txt,.docx"
              onChange={handleDocumentChanged}
              multiple
              style={{ display: "none" }}
            />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} direction="column">
        <Grid item xs={8}>
          <List className="h-[300px] overflow-y-auto border-solid border border-gray-300 rounded-md mt-5 p-3">
            {documents.map((doc, index) => (
              <ListItem key={doc.name} className="border-b border-gray-300">
                <ListItemText primary={doc.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteDocument(index)}
                  >
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

export default Document
