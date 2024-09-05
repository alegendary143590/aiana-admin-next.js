import { useTranslations } from "next-intl"
import { ToastContainer, toast } from "react-toastify"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"

import { AUTH_API } from "@/components/utils/serverURL"
import AlertDialog from "@/components/AlertDialog"
import { isValidUrl } from "@/components/Pages/KnowledgeBasePage/validation"


interface WebsiteObject {
  created_at: string
  id: number
  unique_id: string
  url: string
}

export default function EmbedAlert({ open, setOpen, description, handleCopy }) {
  const [urlInputValue, setUrlInputValue] = useState("")
  const t = useTranslations('common');
  const tk = useTranslations('knowledge');
  const toa = useTranslations('toast');
  const router = useRouter();
  const [id, setId] = React.useState("")
  const [openDialog, setOpenDialog] = React.useState(false)
  const [index, setIndex] = React.useState("")
  const websiteRef = useRef()
  // const router = useRouter()

  const [urls, setUrls] = useState<WebsiteObject[]>([])
  const alertRef = React.useRef(null)
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // const title = "To embed your chatbot onto your website, paste this snippet into your website's HTML file";
  const title =
    `${t('To_add_a_chatbubble_to_the_bottom_right_of_your_website_add_this_script_tag_to_your_html')}`

    const handleUrlAdd = () => {
      if (isValidUrl(urlInputValue)) {
        const existingUrl = urls.find(url => url.url === urlInputValue);
        if (existingUrl) {
          toast.error(`${toa('URL_already_exist')}`, { position: toast.POSITION.TOP_RIGHT });
        } else {
          const newWebsite: WebsiteObject = {
            created_at: new Date().toISOString(),
            id: urls.length + 1,
            unique_id: "", // Assuming you have a function to generate unique IDs
            url: urlInputValue,
          };
          setUrls(prevUrls => [...prevUrls, newWebsite]);
          setUrlInputValue("");
        }
      } else {
        toast.error(tk("Invalid_Domain_Please_enter_a_valid_Domain"), { position: toast.POSITION.TOP_RIGHT });
      }
    };
  
    const handleDeleteUrl = () => {
      axios
        .post(
          AUTH_API.DELETE_URL,
          { id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Example for adding Authorization header
              "Content-Type": "application/json", // Explicitly defining the Content-Type
              "ngrok-skip-browser-warning": "1",
            },
          },
        )
        .then((response) => {
          if (response.status === 201) {
            toast.success(`${toa('Successfully_deleted!')}`, { position: toast.POSITION.TOP_RIGHT })
          } else {
            toast.error(`${toa('Invalid_Request')}`, { position: toast.POSITION.TOP_RIGHT })
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error status code:", error.response.status)
            console.log("Error response data:", error.response.data)
            if (error.response.status === 401) {
              router.push("/signin")
            }
            // Handle the error response as needed
          } else if (error.request) {
            // The request was made but no response was received
            console.log("Error request:", error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error message:", error.message)
          }
          console.log("Error config:", error.config)
          toast.error(`${toa('Invalid_Request')}`, { position: toast.POSITION.TOP_RIGHT })
        })
      const updatedUrls = urls.filter((_, i: any) => i !== index)
      setUrls(updatedUrls)
    }
  
    const handleDeleteButton = (_id, _index) => {
      setId(_id)
      setIndex(_index)
      let websiteArray;
      if (websiteRef.current){
        websiteArray = websiteRef.current;
      } else {
        websiteArray = []
      }
  
      const websiteExists = websiteArray.some(doc => doc.id === _id);
      if (websiteExists) {
        setOpenDialog(true);
  
      } else {
        setUrls(urls.filter(doc => doc.id !== _id));
      }
    }
  
    const handleAgree = () => {
      setOpenDialog(false)
      handleDeleteUrl()
    }
  
    const handleDisagree = () => {
      setOpenDialog(false)
    }

  return (
    open && (
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="min-h-screen text-center block p-0">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />

          {/* Dialog panel */}
          <span
            className="inline-block align-middle h-screen transition duration-150 ease-out"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full max-sm:mx-5 align-middle"
            ref={alertRef}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="relative">
                <h2 className="text-xl font-bold text-center ">https://www.aiana.io</h2>
                <button type="button" className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer text-[#A536FA] font-bold rounded-full" onClick={() => setOpen(false)}>✕</button>
              </div>
              <hr className="my-2" />
              <h3
                className="text-[14px] pt-3 pl-3 leading-6 font-medium text-[#767676]"
                id="modal-title"
              >
                {t("Add_domains_where_you_want_to_use_chatbot")}
              </h3>
              <div className="w-full flex justify-center items-center px-4 text-sm">
                <p className="w-[70px]">{tk('Enter_Domain')}</p>
                <input
                  type="text"
                  value={urlInputValue}
                  onChange={(e) => setUrlInputValue(e.target.value)}
                  className="grow mr-5 border border-[#D9D9D9] rounded-md"
                  id="urlInput"
                />
                <button className="bg-[#A438FA] px-2 py-2 text-white rounded-md w-[90px]" type="button" onClick={handleUrlAdd}>
                  {tk('Add_this_Domain')}
                </button>
              </div>
              <div>
                <div className="overflow-auto max-h-48">
                  <table className="min-w-max w-full whitespace-nowrap">
                    <thead>
                      <tr className="text-xs font-semibold uppercase tracking-wide text-left text-[#767676] border-b-2">
                        <th className="sm:px-7 px-3 py-2">{tk('URL')}</th>
                        <th className="sm:px-7 px-3 py-2">{tk('ACTION')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                      {urls && urls.map((url, i) =>
                        <tr key={url.id}>
                          <td className="sm:px-7 px-3 py-2">
                            <a href={`${url.url}`} target="_blank" className="text-[#A438FA] underline" rel="noreferrer">{url.url}</a></td>
                          <td className="sm:px-7 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteButton(url.id, i)}
                              className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9] size-9 pt-1 rounded-md flex justify-center items-center"
                            >
                              <Image src="/images/icon_trash.svg" alt="trash_icon" width={18} height={18} />
                            </button>
                          </td>
                        </tr>
                      )
                      }
                    </tbody>
                  </table>
                  {
                    urls.length === 0 && (
                      <div className="w-full text-center py-5">
                        <p className="text-[#767676]">{tk('No_URL_added_yet')}</p>
                      </div>
                    )
                  }
                </div>
              </div>
              <AlertDialog
                title={tk('Confirm_Delete')}
                description={tk('Are_you_sure_you_want_to_delete_this_item_This_action_cannot_be_undone')}
                handleAgree={handleAgree}
                handleDisagree={handleDisagree}
                open={openDialog}
                setOpen={setOpenDialog}
              />
              <ToastContainer />
              <h3
                className="text-[14px] pt-3 pl-3 leading-6 font-medium text-[#767676]"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-[#070E0B] bg-[#F4E5FF] p-5 rounded-md">
                  <div className="font-bold mt-2">{description}</div>
                </p>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 transition duration-150 ease-out border-[#A536FA] text-base font-medium hover:bg-[#A536FA] hover:text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  {t('Copy_Script')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
