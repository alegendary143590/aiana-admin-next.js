import React, { useState } from "react"
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

const KnowledgeBaseForm = ({baseId}) => {
  const router = useRouter();
  const [value, setValue] = useState(0)
  const [nameInputValue, setNameInputValue] = useState("")
  const [documents, setDocuments] = useState([])
  const [urls, setUrls] = useState([])
  const [questionAnswers, setQuestionAnswers] = useState([])
    const [bases, setBases] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  if (baseId!=="0"){
    React.useEffect(() => {
    setIsLoading(true)
     const requestOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "1",
      })
    };
    if (baseId) {
      fetch(`${AUTH_API.GET_KNOWLEDGE_BASE}?baseId=${baseId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setBases(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching knowledge bases:', error);
          setIsLoading(false);
        });
    }
  }, []);
  }
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
    documents.forEach(doc => formData.append("files", doc))
    formData.append("urls", JSON.stringify(urls))
    formData.append("qa", JSON.stringify(questionAnswers))
    formData.append("userID", userID)

    try {
      const response = await axios.post(AUTH_API.UPLOAD_DOCUMENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200){
        toast.success("Uploaded Successfully!", { position: toast.POSITION.TOP_RIGHT })
        router.push("/knowledge")
      }
      console.log("Response:", response.data);
    } catch (error) {
      toast.error("Error uploading knowledge base. Please try again.", { position: toast.POSITION.TOP_RIGHT });
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
        <Document documents={documents} setDocuments={setDocuments}/>
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
