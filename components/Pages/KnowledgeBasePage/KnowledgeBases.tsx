import * as React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import router from "next/router";
import { AUTH_API } from "@/components/utils/serverURL"
import AlertDialog from "@/components/AlertDialog"
import { toast } from "react-toastify";
import axios from "axios";

const KnowledgeBase = () => {
  const [bases, setBases] = React.useState([]);
  const [ index, setIndex] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [ openDialog, setOpenDialog]= React.useState(false);


  const handleAddRow = () => {
    router.push(`/knowledge/edit?baseId=-1`);
  }

  // Fetch knowledge bases when component mounts
  React.useEffect(() => {
    setIsLoading(true)
    const userID = localStorage.getItem('userID');
     const requestOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': "1",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
      })
    };
    if (userID) {
      fetch(`${AUTH_API.GET_KNOWLEDGE_BASES}?userId=${userID}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            if( response.status === 401){
              router.push("/signin");
            }
            toast.error(`HTTP error! Status: ${response.status}`, {position:toast.POSITION.TOP_RIGHT});
            return null;
          }
          return response.json();
        })
        .then(data => {
          setBases(data);
          setIsLoading(false);
        })
        .catch(error => {
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
          setIsLoading(false);
        });
    }
  }, []); // Empty dependency array means this effect will only run once after the initial render

  const handleEditClick = (baseId) => {
     router.push(`/knowledge/edit?baseId=${baseId}`);

  }

  const handleDeleteButton = (_index) => {
    setIndex(_index);
    setOpenDialog(true);
  }
  const handleDeleteClick = (baseId) => {
    axios
      .post(AUTH_API.DELETE_KNOWLEDGEBASE, {baseId}, 
        {
          headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
          'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          'ngrok-skip-browser-warning': "1",
        }
      })
      .then((response) => {
        if (response.status === 201) {
          setBases(prevBases => prevBases.filter(prev => prev.id !== baseId));
          toast.success("Successfully deleted!", {position:toast.POSITION.TOP_RIGHT});
        } else {
          toast.error("Invalid Request!", { position:toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) =>  {
          
        if (error.response) {
          // console.log('Error status code:', error.response.status);
          // console.log('Error response data:', error.response.data);
          if (error.response.status === 401){
            toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });

            router.push("/signin")
          }
          if (error.response.status=== 400){
            toast.error("The knowledge base is being used!", { position: toast.POSITION.TOP_RIGHT });

          }
          // Handle the error response as needed
        } else if (error.request) {
          // The request was made but no response was received
          // console.log('Error request:', error.request);
          toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });

        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error message:', error.message);
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });

        }
      });
  }
  
  const handleAgree = () => {
    setOpenDialog(false);
    handleDeleteClick(index);
  }

  const handleDisagree = ( ) => {
    setOpenDialog(false);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full h-[50px] flex items-center justify-center pt-[24px] mb-[10px] text-[28px]">
        <Typography className="text-[20px] w-2/3">Knowledge Base</Typography>
        <Box sx={{ w_th: "30%", height: "fit-content" }}>
          <Button
            onClick={handleAddRow}
            className="bg-[#5b0c99] text-white font-bold py-2 px-4 rounded m-2"
            variant="contained"
            style={{ textTransform: "none" }}
          >
            + Create Knowledgebase
          </Button>
        </Box>
      </div>
      <div className="w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bases && bases.map((base) => (
          <div key={base.id} className="w-72 h-30 bg-[#e6e6e6] shadow-sm p-4 m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <div className="flex-grow flex flex-col">
                <Typography className="text-[20px]">{base.name}</Typography>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="w-12 h-8 text-[12px] my-1 rounded-sm bg-[#00D7CA] text-white"
                style={{ textTransform: "none" }}
                onClick={()=>handleEditClick(base.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="w-12 h-8 text-[12px] my-1 rounded-sm bg-red-500 text-white"
                style={{ textTransform: "none" }}
                onClick={()=>handleDeleteButton(base.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AlertDialog
        title="Confirm Delete"
        description="Are you sure you want to delete this item? This action cannot be undone."
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        open={openDialog}
        setOpen={setOpenDialog}
        />
    </>
  );
}

export default KnowledgeBase;
