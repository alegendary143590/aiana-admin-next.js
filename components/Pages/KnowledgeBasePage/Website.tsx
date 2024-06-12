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
import AlertDialog from "@/components/AlertDialog"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import { AUTH_API } from "@/components/utils/serverURL";
import { useRouter } from "next/router"
import { isValidUrl } from "./validation"

// Define the interface for a website object
interface WebsiteObject {
 created_at: string;
 id: number;
 unique_id: string;
 url: string;
}
const Website = ({urls, setUrls}) => {
  const router = useRouter();
  const [urlInputValue, setUrlInputValue] = useState("");
  const [ openDialog, setOpenDialog]= React.useState(false);
  const [id, setId] = React.useState("");
  const [index, setIndex] = React.useState("");

  

  const handleUrlAdd = () => {
    if (isValidUrl(urlInputValue)) {
      
      const newWebsite: WebsiteObject = {
        created_at: new Date().toISOString(), 
        id: -1, // 
        unique_id: "", 
        url: urlInputValue,
      };
      setUrls([...urls, newWebsite]);
      setUrlInputValue("");
    } else {
      alert("Invalid URL. Please enter a valid URL.");
    }
 };

 const handleDeleteUrl = () =>{
  axios
      .post(AUTH_API.DELETE_URL, {id}, 
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
          'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          'ngrok-skip-browser-warning': "1",
        }
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Successfully deleted!", {position:toast.POSITION.TOP_RIGHT});
        } else {
          toast.error("Invalid Request!", { position:toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) =>  {
          
          console.log(error);
          toast.error("Invalid Request!", { position:toast.POSITION.TOP_RIGHT })
      });
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
 }

 const handleDeleteButton = (_id, _index) => {
    setId(_id);
    setIndex(_index);
    setOpenDialog(true);
 };

 const handleAgree = () => {
  setOpenDialog(false);
  handleDeleteUrl();
}

const handleDisagree = ( ) => {
  setOpenDialog(false);
}

  return (
    <Paper elevation={3} className="w-[700px] h-[90%] p-5 mt-20">
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
              <ListItem key={url.id} className="border-b border-gray-300" style={{width:"100%"}}>
                <ListItemText primary={url.url} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteButton(url.id, index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <AlertDialog
          title="Confirm Delete"
          description="Are you sure you want to delete this item? This action cannot be undone."
          handleAgree={handleAgree}
          handleDisagree={handleDisagree}
          open={openDialog}
          setOpen={setOpenDialog}
          />
      <ToastContainer />
    </Paper>
  )
}

export default Website
