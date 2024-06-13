import React, { useState, useRef } from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { Grid, TextField, Typography, Button } from "@mui/material"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { AUTH_API } from "@/components/utils/serverURL"
import { useRouter} from "next/router"

import Document from "./Document"
import Website from "./Website"
import Text from "./Text"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="w-full h-full"
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

// Define the interface for the base object
interface Base {
 created_at: string;
 id: number;
 name: string;
 unique_id: string;
 user_id: number;
}

const KnowledgeBaseForm = ({baseId}) => {
  const router = useRouter();
  const [value, setValue] = useState(0)
  const [nameInputValue, setNameInputValue] = useState("")
  const [documents, setDocuments] = useState([])
  const [files, setFiles] = useState([])
  const [urls, setUrls] = useState([])
  const [questionAnswers, setQuestionAnswers] = useState([])
  const [base, setBase] = React.useState<Base>({created_at: "",
    id: 0,
    name: "",
    unique_id: "",
    user_id: 0,});

  const documentRef = useRef([]);
  const filesRef = useRef([]);
  const urlsRef = useRef([]);
  const qaRef = useRef([]);

  const [isLoading, setIsLoading] = React.useState(false);
  let newBaseId = baseId;
  React.useEffect(() => {
 // Use a local variable instead of modifying the parameter directly
    if (!newBaseId) {
      const storedBaseId = localStorage.getItem('lastBaseId');
      newBaseId = storedBaseId;
    } else {
      localStorage.setItem('lastBaseId', newBaseId);
    }
  }, [baseId]);
  React.useEffect(() => {
  if (newBaseId !== "-1"){
    

    const fetchData = async () => {
      if (newBaseId && newBaseId !== "-1") {
        setIsLoading(true);
        try {
          const requestOptions = {
            headers: new Headers({
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': "1",
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            })
          };
          const response = await fetch(`${AUTH_API.GET_KNOWLEDGE_BASE}?baseId=${newBaseId}`, requestOptions);
          const data = await response.json();

          setBase(data.base || {
            created_at: "",
            id: 0,
            name: "",
            unique_id: "",
            user_id: 0,
          });
          setNameInputValue(data.base.name)
          setDocuments(data.documents || []);
          documentRef.current = data.documents;
          setUrls(data.websites || []);
          urlsRef.current = data.websites;
          setQuestionAnswers(data.texts || []);
          qaRef.current = data.texts;
        } catch (error) {
          console.error('Error fetching knowledge bases:', error);
          toast.error("Failed to load data", { position: toast.POSITION.TOP_RIGHT });
        }
        
        setIsLoading(false);
      }
    };

    fetchData();
  }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  
  const handleSubmit = async () => {
    if ( nameInputValue === ""){
       toast.error("Please input the name!", { position: toast.POSITION.TOP_RIGHT })
       return
    }

    if(documents.length === 0 && urls.length === 0 && questionAnswers.length === 0){
      toast.error("Please input the data!", { position: toast.POSITION.TOP_RIGHT })
      return
    }

    const userID = localStorage.getItem("userID")
    const formData = new FormData()
    formData.append("name", nameInputValue)
    const updatedDocs = documents.filter(doc=> !documentRef.current.includes(doc));
    formData.append("docs", JSON.stringify(updatedDocs));
    const updatedFiles = files.filter(file=> !filesRef.current.includes(file));
    updatedFiles.forEach(doc => formData.append("files", doc))
    const updatedUrls = urls.filter(url=>!urlsRef.current.includes(url));
    formData.append("urls", JSON.stringify(updatedUrls))
    const updatedQa = questionAnswers.filter(qa=> !qaRef.current.includes(qa));
    formData.append("qa", JSON.stringify(updatedQa));
    formData.append("userID", userID)

    try {
      let API = ""
      if (newBaseId ==="-1"){
        API = AUTH_API.UPLOAD_DOCUMENT
      } else {
        API = `${AUTH_API.UPDATE_KNOWLEDGE_BASE}`
        formData.append("unique_id", base.unique_id);
      }
      const response = await axios.post(API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': "1",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (response.status === 200){
        let badAlert = ""
        if (!response.data.bad_url) {
          badAlert = "The knowledge base includes invalid url."
        }
        toast.success("Uploaded Successfully!"+badAlert, { position: toast.POSITION.TOP_RIGHT })
        router.push("/knowledge")
      }
    } catch (error) {
      if (error.response) {
        console.log('Error status code:', error.response.status);
        console.log('Error response data:', error.response.data);
        if (error.response.status === 401){
          toast.error("Session Expired!", { position:toast.POSITION.TOP_RIGHT })
          router.push("/signin")
        }
        // Handle the error response as needed
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
      
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        
      }}
      className = "relative"
    > 
      
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={2} className="mt-2 absolute top-[65px] flex items-center justify-center">
        <Grid item xs={4} md={2} className="flex justify-end items-center">
          <Typography>Name:</Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <TextField
            type="text"
            value={nameInputValue}
            onChange={(e) => setNameInputValue(e.target.value)}
            className="w-[50%]"
            id="urlInput"
          />
        </Grid>
        <Grid item xs={8} md={2} className="flex justify-start">
          <Button className="bg-[#0099ff]" variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Grid>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
        >
          <Tab label="Document" {...a11yProps(0)} />
          <Tab label="Website" {...a11yProps(1)} />
          <Tab label="Text" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Document documents={documents} setDocuments={setDocuments} setFiles={setFiles} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Website urls={urls} setUrls = {setUrls} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Text questionAnswers={questionAnswers} setQuestionAnswers={setQuestionAnswers} />
      </CustomTabPanel>
      <ToastContainer />
    </Box>
  )
}

export default KnowledgeBaseForm
