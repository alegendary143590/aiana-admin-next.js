import { useState, useEffect } from "react"
import router from "next/router"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

import { AUTH_API } from "@/components/utils/serverURL"
import Avatar from "@/components/Avatar"
import Image from "next/image"
import { useTranslation } from "react-i18next"

const ChatLogs = () => {
  const { t } = useTranslation('dashboard');
  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    setUserID(localStorage.getItem("userID"))
    if (userID !== "") {
      setIsLoading(true)
      axios
        .post(AUTH_API.GET_CHAT, { userID }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const chatLogs = response.data;
            setChatLog(chatLogs);
          }
          if (response.status === 401) {
            toast.error("Please login!", { position: toast.POSITION.TOP_RIGHT });
            router.push("/signin");
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
  }, [userID])

  const handleDeleteButton = (sessionId) => {
    axios
      .post(`${AUTH_API.DELETE_CHATLOG}`, { sessionId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
          'Content-Type': 'application/json',  // Explicitly defining the Content-Type
        }
      })
      .then((response) => {
        if (response.status === 201) {
          const updatedChatLog = chatLog.filter((log) => log.session_id !== sessionId);
          setChatLog(updatedChatLog);
          toast.success("Chatlog deleted successfully!", { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch(() => {
        toast.error("Failed to delete chatlog. Please try again later!", { position: toast.POSITION.TOP_RIGHT });
      });
  }

  const handleRowClick = (sessionId) => {
    router.push(`/${router.query.locale}/log/log?sessionId=${sessionId}`);
  }

  if (isLoading) {
    return (
      <div>{t('Loading...')}</div>
    )
  }

  return (
    <>
      <div className="w-full mx-auto p-5">
        <div className="w-full h-[50px] flex items-center justify-between pt-[24px] mb-[10px]">
          <h3 className="font-bold text-2xl">{t('Chatlogs')}</h3>
        </div>
      </div>
      <table className="w-full rounded-table min-w-[600px]" aria-label="table">
        <thead className="bg-[#EEEEEE] text-[#767676] text-sm ">
          <tr>
            <th className="px-4 py-2 text-start">{t('CHATBOT NAME')}</th>
            <th className="px-4 py-2 text-start">{t('STARTED ON')}</th>
            <th className="px-4 py-2 text-start">{t('ENDED ON')}</th>
            <th className="px-4 py-2 text-start">{t('STATUS')}</th>
            <th className="px-4 py-2 text-start">{t('ACTION')}</th>
          </tr>
        </thead>
        <tbody className="gap-3 my-2">
          {chatLog.map((row) => (
            <>
              <tr className="h-3" />
              <tr key={row.id} className="hover:bg-gray-100 cursor-pointer border border-[#BEBEBE] border-round">

                <td >
                  <button type="button" onClick={() => handleRowClick(row.session_id)} className="px-4 py-2 w-full h-full flex justify-start items-center gap-3 font-bold">
                    <Avatar src={row.bot_avatar || "/images/logo_sm.png"} name="avatar" className="size-10 rounded-full" />
                    {row.bot_name}
                  </button>

                </td>
                <td className="px-4 py-2">
                  <button type="button" onClick={() => handleRowClick(row.session_id)} className="w-full h-full py-4 text-start">
                    {row.created_at}
                  </button>
                </td>
                <td className="px-4 py-2"><button type="button" onClick={() => handleRowClick(row.session_id)} className="w-full h-full py-4 text-start">{row.ended_at}</button></td>
                <td className={`px-4 py-2 italic font-bold ${row.bot_active > 0 ? "text-black" : "text-[#BA1126]"}`}><button type="button" onClick={() => handleRowClick(row.session_id)} className="w-full h-full py-4 text-start">{row.bot_active > 0 ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteButton(row.session_id)}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9] size-9 pt-1 rounded-md flex justify-center items-center"
                  >
                    <Image src="/images/icon_trash.svg" alt = "trash_icon" width={18} height={18} />
                  </button>
                </td>
              </tr>
            </>


          ))}
        </tbody>

      </table>
      <ToastContainer />
    </>

  )
}

export default ChatLogs
