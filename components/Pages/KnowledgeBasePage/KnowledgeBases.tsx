import * as React from "react";
import axios from "axios";
import router from "next/router";
import Image from "next/image";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { AUTH_API } from "@/components/utils/serverURL"
import AlertDialog from "@/components/AlertDialog"

const KnowledgeBase = () => {
  const [bases, setBases] = React.useState([]);
  const [index, setIndex] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);


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
            if (response.status === 401) {
              router.push("/signin");
            }
            toast.error(`HTTP error! Status: ${response.status}`, { position: toast.POSITION.TOP_RIGHT });
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
            if (error.response.status === 401) {
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
      .post(AUTH_API.DELETE_KNOWLEDGEBASE, { baseId },
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
          toast.success("Successfully deleted!", { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.error("Invalid Request!", { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) => {

        if (error.response) {
          // console.log('Error status code:', error.response.status);
          // console.log('Error response data:', error.response.data);
          if (error.response.status === 401) {
            toast.error("Session Expired. Please log in again!", { position: toast.POSITION.TOP_RIGHT });

            router.push("/signin")
          }
          if (error.response.status === 400) {
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

  const handleDisagree = () => {
    setOpenDialog(false);
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (bases && bases.length === 0) {
    return (
      <div className="w-[90%] mx-auto p-5">
        <div className="w-full h-[50px] flex items-center justify-between pt-[24px] mb-[10px]">
          <h3 className="font-bold text-2xl">Knowledge Base</h3>
        </div>
        <div className="max-sm:w-full w-[300px] h-fit mx-auto mt-10 flex flex-col items-center justify-between">
          <Image src="/images/icon_noKnowledge.svg" alt="no_bot" width={100} height={100} />
          <p className="text-xl font-bold text-center mt-10">No knowledge base created yet</p>
          <p className="text-[#767676] text-center my-5">
            Create knowledge base and connect it to chatbot!
          </p>
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-[#A536FA] max-sm:w-full w-[210px] sm:h-[40px] h-auto p-3 flex items-center justify-center gap-1 text-white font-bold rounded-md"
            >
              <Image src="/images/icon_createKnowledge.svg" alt="create" width={20} height={20} />
              <p>Create Knowledge Base</p>
            </button>
          </div>
        </div>
        <AlertDialog
          title="Confirm Delete"
          description="Are you sure you want to delete this item? This action cannot be undone."
          handleAgree={handleAgree}
          handleDisagree={handleDisagree}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto p-5">
      <div className="w-full max-sm:flex-col flex items-center justify-between pt-[24px] mb-[10px]">
        <h3 className="font-bold text-2xl max-sm:mb-5">Knowledge Base</h3>
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-[#A536FA] max-sm:w-full w-[210px] sm:h-[40px] h-auto p-3 flex items-center justify-center gap-1 text-white font-bold rounded-md"
        >
          <Image src="/images/icon_createKnowledge.svg" alt="create" width={20} height={20} />
          <p>Create Knowledge Base</p>
        </button>
      </div>
      <div className="relative w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bases && bases.map((base) => (
          <div key={base.id} className="w-[300px] h-fit border-2 border-[#A438FA] shadow-sm rounded-lg m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <div className="w-full h-fit px-5 pt-5">
                <p className="font-bold text-xl">{base.name}</p>
              </div>
            </div>
            <div className="flex overflow-auto w-full h-[50px] px-5 items-center gap-2">
              <p className="text-sm text-[#070E0B]">Connected with</p>
              <div>
                {
                  base.bot_avatar && base.bot_avatar.map((avatar) => (
                    <Image
                      key={avatar}
                      src={avatar || "/images/logo_sm.png"}
                      alt="bot_avatar"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />)
                  )
                }
              </div>
            </div>
            <hr className="my-5" />
            <div className="flex flex-row justify-end gap-3 mx-5 mb-5">
              <button
                type="button"
                className="size-8 text-[12px] rounded-full border-2 border-[#2CA84D] text-[#2CA84D] flex justify-center items-center"
                onClick={() => handleEditClick(base.id)}
              >
                <FaEdit className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="size-8 text-[12px] rounded-full border-2 border-[#D7263C] text-[#D7263C] flex justify-center items-center"
                onClick={() => handleDeleteButton(base.id)}
              >
                <FaRegTrashAlt className="w-4 h-4" />
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
    </div >

  );
}

export default KnowledgeBase;
