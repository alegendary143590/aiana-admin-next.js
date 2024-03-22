import React, { useState } from "react"
import { Grid, Typography, Button, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/InfoRounded"

const Document = () => {
    const [documents, setDocuments] = useState([])
    const [nameInputValue, setNameInputValue] = useState("")

    const handleDocumentChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        const allowedTypes = ["application/pdf", "application/msword", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

        const newDocs = Array.from(fileList).filter(file => allowedTypes.includes(file.type));

        setDocuments([...documents, ...newDocs]);
    }

    const handleDeleteDocument = (index) => {
        const updatedDocuments = documents.filter((doc, i) => i !== index);
        setDocuments(updatedDocuments);
    }

    return (
        <Paper elevation={3} className="w-[700px] h-full p-5">
            <Grid container spacing={2} className="mt-5">
                <Grid item xs={4} className="flex justify-end items-center">
                    <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="text" value={nameInputValue} onChange={(e) => setNameInputValue(e.target.value)} className="w-full" id="urlInput" />
                </Grid>
            </Grid>
            <Grid container className="p-5 mt-2">
                <Typography className="bg-[#e6f2ff] w-full mr-5 ml-5 p-3" sx={{ lineHeight: '2' }}>
                    <InfoIcon className="text-[#33adff] mr-2 mb-1" />
                    Build your chatbot&apos;s knowledge base by uploading documents. These documents train your chatbot to answer questions accurately.
                </Typography>
            </Grid>
            <Grid container spacing={2} className="mt-1">
                <Grid item xs={6} className="flex justify-end items-center">
                    <Typography>Upload Documents:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        component="label"
                        role="doc_upload"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Choose Documents
                        <input type="file" accept=".pdf,.doc,.txt,.docx" onChange={handleDocumentChanged} multiple style={{ display: 'none' }} />
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column">
                <Grid item xs={8}>
                    <List className="h-[350px] overflow-y-auto border-solid border border-gray-300 rounded-md mt-5 p-3">
                        {documents.map((doc, index) => (
                            <ListItem key={index.toString()} className="border-b border-gray-300">
                                <ListItemText primary={doc.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleDeleteDocument(index)}>
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
    );
}

export default Document;
