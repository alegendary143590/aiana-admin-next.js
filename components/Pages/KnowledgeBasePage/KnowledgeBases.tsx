import * as React from "react";
import axios from "axios";
import router from "next/router";
import Image from "next/image";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import { AUTH_API } from "@/components/utils/serverURL"
import AlertDialog from "@/components/AlertDialog"
import ScrollableItems from "@/components/ScrollableItems";
import { setExpiryTime } from "@/components/utils/common";

const KnowledgeBase = () => {
  const t = useTranslations('knowledge');
  const toa = useTranslations('toast');
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
          setExpiryTime();
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
              toast.error(`${toa('Session_Expired_Please_log_in_again')}`, { position: toast.POSITION.TOP_RIGHT });

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
          toast.success(`${toa('Successfully_deleted!')}`, { position: toast.POSITION.TOP_RIGHT });
        } else {
          toast.error(`${toa('Invalid_Request')}`, { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) => {

        if (error.response) {
          // console.log('Error status code:', error.response.status);
          // console.log('Error response data:', error.response.data);
          if (error.response.status === 401) {
            toast.error(`${toa('Session_Expired_Please_log_in_again')}`, { position: toast.POSITION.TOP_RIGHT });

            router.push("/signin")
          }
          if (error.response.status === 400) {
            toast.error(`${toa('The_knowledge_base_is_being_used')}`, { position: toast.POSITION.TOP_RIGHT });

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
    return <div>{t('Loading')}</div>;
  }

  if (bases && bases.length === 0) {
    return (
      <div className="w-[90%] mx-auto p-5">
        <div className="w-full h-[50px] flex items-center justify-between pt-[24px] mb-[10px]">
          <h3 className="font-bold text-2xl">{t('Knowledge_Base')}</h3>
        </div>
        <div className="max-sm:w-full w-[350px] h-fit mx-auto mt-10 flex flex-col items-center justify-between">
          <Image src="/images/icon_noKnowledge.svg" alt="no_bot" width={100} height={100} />
          <p className="text-xl font-bold text-center mt-10">{t('No_knowledge_base_created_yet')}</p>
          <p className="text-[#767676] text-center my-5">
            {t('Create_knowledge_base_and_connect_it_to_chatbot')}
          </p>
          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-[#A536FA] max-sm:w-full w-[210px] sm:h-[40px] h-auto p-3 flex items-center justify-center gap-1 text-white font-bold rounded-md"
            >
              <Image src="/images/icon_createKnowledge.svg" alt="create" width={15} height={15} />
              <p>{t('Create_Knowledge_Base')}</p>
            </button>
          </div>
        </div>
        <AlertDialog
          title={t('Confirm_Delete')}
          description={t('Are_you_sure_you_want_to_delete_this_item_This_action_cannot_be_undone')}
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
        <h3 className="font-bold text-2xl max-sm:mb-5">{t('Knowledge_Base')}</h3>
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-[#A536FA] max-sm:w-full w-[210px] sm:h-[40px] h-auto p-3 flex items-center justify-center gap-1 text-white font-bold rounded-md"
        >
          <Image src="/images/icon_createKnowledge.svg" alt="create" width={15} height={15} />
          <p>{t('Create_Knowledge_Base')}</p>
        </button>
      </div>
      <div className="relative w-full h-fit flex flex-wrap mt-10 items-center justify-start">
        {bases && bases.map((base) => (
          <div key={base.id} className="w-[300px] h-fit border-2 border-solid border-[#A438FA] shadow-sm rounded-lg m-3">
            <div className="w-full h-fit flex flex-row items-center justify-center">
              <div className="w-full h-fit px-5 pt-5">
                <p className="font-bold text-xl">{base.name}</p>
              </div>
            </div>
            <div className="flex w-full h-[50px] px-5 items-center gap-2">
              
              <p className="text-sm text-[#070E0B]">{t('Connected_with')}</p>
              
              <ScrollableItems items={base.bot_avatar.map((item, itemIndex) => { const newItem = { item, index: itemIndex }; return newItem; })} tooltips={base.bot_names} />

            </div>
            <hr className="my-5" />
            <div className="flex flex-row justify-end gap-3 mx-5 mb-5">
              <div className="group relative flex justify-center">
                <button
                  type="button"
                  aria-label="edit-knowledge-base"
                  className="size-8 text-[12px] rounded-full border-2 border-[#2CA84D] text-[#2CA84D] flex justify-center items-center"
                  onClick={() => handleEditClick(base.id)}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <span className="absolute top-9 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{t('Edit')}</span>
              </div>

              <div className="group relative flex justify-center">
                <button
                  type="button"
                  aria-label="delete-knowledge-base"
                  className="size-8 text-[12px] rounded-full border-2 border-[#D7263C] text-[#D7263C] flex justify-center items-center"
                  onClick={() => handleDeleteButton(base.id)}
                >
                  <FaRegTrashAlt className="w-4 h-4" />
                </button>
                <span className="absolute top-9 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{t('Delete')}</span>
              </div>


            </div>
          </div>

        ))}
      </div>
      <AlertDialog
        title={t('Confirm_Delete')}
        description={t('Are_you_sure_you_want_to_delete_this_item_This_action_cannot_be_undone')}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </div >

  );
}

export default KnowledgeBase;
