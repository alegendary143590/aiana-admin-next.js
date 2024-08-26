
import React, { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import router from "next/router"
import { ToastContainer, toast } from "react-toastify"
import { useTranslations } from "next-intl"

import { AUTH_API } from "@/components/utils/serverURL"
import formatDateString, { setExpiryTime } from '@/components/utils/common'
import AlertDialog from "@/components/AlertDialog"

const Tickets = () => {
  const t = useTranslations('ticket');
  const toa = useTranslations('toast');
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userID");
    setIsLoading(true);
    if (userIdFromStorage !== "") {
      setUserId(userIdFromStorage);

      axios.post(AUTH_API.GET_TICKETS, { userId: userIdFromStorage }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
          'Content-Type': 'application/json',  // Explicitly defining the Content-Type
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setTickets(response.data);
            setExpiryTime();
          }
          if (response.status === 401) {
            toast.error(`${toa('Please_login')}`, { position: toast.POSITION.TOP_RIGHT });
            router.push("/signin");

          }
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            console.log('Error status code:', error.response.status);
            console.log('Error response data:', error.response.data);
            if (error.response.status === 401) {
              toast.error(`${toa('Session_Expired_Please_log_in_again')}`, { position: toast.POSITION.TOP_RIGHT });

              router.push("/signin")
            }
            // Handle the error response as needed
          } else if (error.request) {
            toast.error(error.request, { position: toast.POSITION.TOP_RIGHT });

          } else {
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });

          }
          setIsLoading(false);
        });
    }
  }, []);

  const handleCancelButton = (id) => {
    setCurrentItem(id);
    setOpenDialog(true);
  }

  const handleAgree = () => {
    setOpenDialog(false);
    axios
      .post(AUTH_API.DEL_TICKET, { currentItem }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Example for adding Authorization header
          'Content-Type': 'application/json',  // Explicitly defining the Content-Type
        }
      })
      .then((response) => {
        if (response.status === 201) {
          const updatedTickets = tickets.filter(ticket => ticket.id !== currentItem);
          setTickets(updatedTickets);
          toast.success(`${toa('Successfully_deleted!')}`, { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) => {
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
      })
  }

  const handleDisagree = () => {
    setOpenDialog(false);
  }

  if (isLoading || !userId) {
    return (
      <div>{t('Loading')}</div>
    )
  }

  return (
    <div>
      <div className="w-full mx-auto p-5">
        <div className="w-full h-[50px] flex items-center justify-between pt-[24px] mb-[10px]">
          <h3 className="font-bold text-2xl">{t('tickets')}</h3>
        </div>
      </div>
      {tickets.length === 0 ? (
        <div className="text-center w-full">{t('There_is_no_ticket')}</div>
      ) : (
        <table className="w-full rounded-table min-w-[600px]" aria-label="table">
          <thead className="bg-[#EEEEEE] text-[#767676] text-sm ">
            <tr>
              <th className="px-4 py-2 text-start">{t('No')}</th>
              <th className="px-4 py-2 text-start">{t('Email')}</th>
              <th className="px-4 py-2 text-start">{t('Website')}</th>
              <th className="px-4 py-2 text-start">{t('Content')}</th>
              <th className="px-4 py-2 text-start">{t('Status')}</th>
              <th className="px-4 py-2 text-start">{t('Created_at')}</th>
              <th className="px-4 py-2 text-start">{t('Action')}</th>
            </tr>
          </thead>
          <tbody className="gap-3 my-2">
            {tickets.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr className="h-3" />
                <tr key={row.id} className="hover:bg-gray-100 cursor-pointer border border-[#BEBEBE] border-round">
                  <td > {index + 1}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.website}</td>
                  <td className="px-4 py-2">{row.content}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{formatDateString(row.created_at)}</td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleCancelButton(row.id)}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9] size-9 pt-1 rounded-md flex justify-center items-center"
                    >
                      <Image src="/images/icon_trash.svg" alt="icon_trash" width={18} height={18} />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      <AlertDialog
        title={t("Confirm_Delete")}
        description={t('Are_you_sure_you_want_to_delete_this_item_This_action_cannot_be_undone')}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        open={openDialog}
        setOpen={setOpenDialog}
      />
      <ToastContainer />
    </div>
  )
}

export default Tickets
