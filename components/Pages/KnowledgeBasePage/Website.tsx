import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import { FaInfoCircle } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"

import AlertDialog from "@/components/AlertDialog"
import { AUTH_API } from "@/components/utils/serverURL"
import { isValidUrl } from "./validation"

// Define the interface for a website object
interface WebsiteObject {
  created_at: string
  id: number
  unique_id: string
  url: string
}
const Website = ({ urls, setUrls }) => {
  const router = useRouter()
  const [urlInputValue, setUrlInputValue] = useState("")
  const [openDialog, setOpenDialog] = React.useState(false)
  const [id, setId] = React.useState("")
  const [index, setIndex] = React.useState("")

  const handleUrlAdd = () => {
    if (isValidUrl(urlInputValue)) {
      const newWebsite: WebsiteObject = {
        created_at: new Date().toISOString(),
        id: -1, //
        unique_id: "",
        url: urlInputValue,
      }
      setUrls([...urls, newWebsite])
      setUrlInputValue("")
    } else {
      alert("Invalid URL. Please enter a valid URL.")
    }
  }

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
          toast.success("Successfully deleted!", { position: toast.POSITION.TOP_RIGHT })
        } else {
          toast.error("Invalid Request!", { position: toast.POSITION.TOP_RIGHT })
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
        toast.error("Invalid Request!", { position: toast.POSITION.TOP_RIGHT })
      })
    const updatedUrls = urls.filter((_, i) => i !== index)
    setUrls(updatedUrls)
  }

  const handleDeleteButton = (_id, _index) => {
    setId(_id)
    setIndex(_index)
    setOpenDialog(true)
  }

  const handleAgree = () => {
    setOpenDialog(false)
    handleDeleteUrl()
  }

  const handleDisagree = () => {
    setOpenDialog(false)
  }

  return (
    <div className="w-full overflow-y-auto">
      <div className="text-center bg-[#F5E8FF] py-2 sm:mx-7 mx-3">
        <span className="text-[#343434] text-sm text-center">
          <FaInfoCircle className="text-[#A536FA] size-5 inline-block" />
          Note: Build your Chatbot’s Knowledge Base by uploading urls. These urls train your chatbot to answer questions accurately.
        </span>
      </div>
      <div className="w-full md:inline-flex flex-wrap justify-center items-center px-10 mt-5 max-md:space-y-5 py-10">
        <p className="w-[100px] text-lg">Enter URL:</p>
        <input
          type="text"
          value={urlInputValue}
          onChange={(e) => setUrlInputValue(e.target.value)}
          className="grow mr-5 border border-[#D9D9D9] rounded-md"
          id="urlInput"
        />
        <button className="bg-[#A438FA] px-2 py-2 text-white rounded-md w-[150px]" type="button" onClick={handleUrlAdd}>
          Add this URL
        </button>
      </div>
      <div>
        <div className="w-full justify-between flex my-5 sm:px-7 px-3">
          <h4 className="text-lg font-bold">URLs List</h4>
          <p className="text-[#767676] text-sm">{urls.length} URL added</p>
        </div>
        <div className="overflow-auto">
          <table className="min-w-max w-full whitespace-nowrap">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wide text-left text-[#767676] border-b-2">
                <th className="sm:px-7 px-3 py-2">URL</th>
                <th className="sm:px-7 px-3 py-2">ADDED ON</th>
                <th className="sm:px-7 px-3 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {urls && urls.map((url, i) =>
                <tr key={url.id}>
                  <td className="sm:px-7 px-3 py-2">
                    <a href={`${url.url}`} className="text-[#A438FA] underline">{url.url}</a></td>
                  <td className="sm:px-7 px-3 py-2">{url.created_at}</td>
                  <td className="sm:px-7 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteButton(url.id, i)}
                      className="focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9] size-9 pt-1 rounded-md"
                    >
                      <Image src="/images/icon_trash.svg" width={18} height={18} />
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
                <p className="text-[#767676]">No URL added yet</p>
              </div>
            )
          }
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
      <ToastContainer />
    </div>
  )
}

export default Website
