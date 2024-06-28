import React from "react";
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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/InfoRounded";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AUTH_API } from "@/components/utils/serverURL";
import { useRouter } from "next/router";
import AlertDialog from "@/components/AlertDialog";
import { v4 as uuidv4 } from 'uuid';


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

const Document = ({documents, documentRef, setDocuments, setFiles}) => {
  const [ openDialog, setOpenDialog]= React.useState(false);
  const [id, setId] = React.useState("");
  const [index, setIndex] = React.useState("");
  const router = useRouter();
  
  const handleDocumentChanged = (event) => {
    const fileList = event.target.files;
    const validFiles = [];


    for (let i = 0; i < fileList.length; i+=1) {
      if (fileList[i].size <= MAX_FILE_SIZE) {
        validFiles.push(fileList[i]);
      } else {
        toast.error(
          `File "${fileList[i].name}" exceeds the maximum size of 5MB.`,
          { position: toast.POSITION.TOP_RIGHT }
        );
      }
    }
    setFiles(validFiles); // Only set valid files
    const newDocs = validFiles.map((file: File) => ({
      created_at: new Date().toISOString(),
      filename: file.name,
      id: uuidv4(),
      type: file.type,
      unique_id: "",
    }))
    setDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (_id, _index) => {
    setId(_id);
    setIndex(_index);
    const documentsArray = documentRef.current;

  // Check if any document in the array has an ID matching _id
  const documentExists = documentsArray.some(doc => doc.id === _id);
    if (documentExists) {
      setOpenDialog(true);

    } else {
      setDocuments(documents.filter(doc=>doc.id!==_id));
    }
  }

  const handleDeleteDocument = () => {
  
    axios
      .post(AUTH_API.DELETE_DOCUMENT, {id}, 
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
      .catch((error) => {
        if (error.response) {
          console.log('Error status code:', error.response.status);
          console.log('Error response data:', error.response.data);
          if (error.response.status === 401){
            toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });

            router.push("/signin")
          }
          // Handle the error response as needed
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Error request:', error.request);
          toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });

        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });

        }
      });
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);

  };

  const handleAgree = () => {
    setOpenDialog(false);
    handleDeleteDocument();
  }

const handleDisagree = ( ) => {
    setOpenDialog(false);
}



  return (
    <Paper elevation={3} className="w-[700px] h-[90%] p-5 mt-20 overflow-y-auto">
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
              accept=".pdf,.txt,.docx"
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
            {documents.map((doc, i) => (
              <ListItem key={doc.id} className="border-b border-gray-300">
                <ListItemText primary={doc.filename} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(doc.id, i)}
                  >
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

export default Document
