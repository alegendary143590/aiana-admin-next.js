import { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { AUTH_API } from "@/components/utils/serverURL"
import formatDateString from "@/components/utils/common"
import router from "next/router"
import Image from 'next/image'
import { FaArrowLeft } from "react-icons/fa"
import Avatar from "@/components/Avatar"

const Logs = ({ session }) => {
  const INITIAL_BOT_OBJ = {
    bot_name: "",
    greetings: "Hello! How can I assist you today?",
    avatar: "",
    start_time: "",
  }
  const [isLoading, setIsLoading] = useState(false);
  const [, setBot] = useState(INITIAL_BOT_OBJ)
  const [conversation, setConversation] = useState([])
  const [botAvatar, setBotAvatar] = useState('/images/logo_sm.png');

  useEffect(() => {
    if (session !== undefined) {
      setIsLoading(true)
      axios
        .post(AUTH_API.GET_LOG_DATA, { session }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          }
        })
        .then((response) => {
          if (response.status === 401) {
            toast.error("Please login!", { position: toast.POSITION.TOP_RIGHT });
            router.push("/signin");
          }
          // console.log("conversation >>>>>", response.data)

          if (response.data && response.data.log) {
            // Assuming log contains keys like bot_name and created_at
            const updatedBot = {
              ...INITIAL_BOT_OBJ,
              bot_name: response.data.log.bot_name || INITIAL_BOT_OBJ.bot_name,
              start_time: formatDateString(response.data.log.created_at || INITIAL_BOT_OBJ.start_time),
              avatar: response.data.log.avatar || INITIAL_BOT_OBJ.avatar,
              greetings: response.data.log.greetings || INITIAL_BOT_OBJ.greetings,

              // Add more mappings as needed based on the structure of response.data.log
            };
            setBot(updatedBot);
          }
          if (response.data && response.data.conversation) {
            setConversation(response.data.conversation)
          }
          if (response.data && response.data.bot_avatar) {
            setBotAvatar(response.data.bot_avatar)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
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
        })
    }
  }, [session])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="h-full sm:w-[90%] w-full mx-auto sm:p-5">
      <div className="w-full h-[50px] relative flex items-center justify-start text-black_8 pt-[20px] mb-[10px] text-[20px]">
        <div className="bg-none w-full rounded-lg flex items-center gap-3">
          <button type="button" className="bg-[#F4F4F4] text-[#767676] font-[300] p-3 rounded-md" onClick={() => router.push("/dashboard")}>
            <FaArrowLeft />
          </button>
          <h3 className="text-lg font-bold">Back to Chatlogs</h3>
        </div>
      </div>
      <div className="max-w-[1000px] overflow-y-auto border border-[#CFCFCF] rounded-md">
        <div className="sm:w-[400px] w-full mx-auto overflow-y-auto rounded-md mt-5 p-3">
          <div className="flex flex-col text-gray-500">
            {conversation.map((conv) => (
              <div key={conv.id} className="flex flex-col m-2">
                <div className="flex flex-row justify-end items-center w-full pl-10 pb-2">
                  <div className="text-[14px] text-white bg-[#A438FA] p-2 rounded-md">
                    {conv.user_message}
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex items-start gap-2 w-[70%]">
                    <Avatar
                      src={botAvatar}
                      name="avatar"
                      className="rounded-full size-12"
                    />
                    <div className="text-[14px] text-[#070E0B] bg-[#EBEBEB] rounded-md p-2">
                      {conv.response}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full relative mt-3">
            <input type="text" className="w-full rounded-md border-[#CFCFCF]" disabled />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 py-auto flex items-center justify-center">
              <Image src="/images/icon_send.svg" alt="send" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Logs
