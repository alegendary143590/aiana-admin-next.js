import React, {useEffect, useState} from 'react'
import { toast } from "react-toastify"
import router from "next/router"
import Image from 'next/image'
import axios from "axios"

import { AUTH_API } from "@/components/utils/serverURL"

const SendLinkPage = () => {

  const [email, setEmail] = useState("");

  useEffect(()=>{
    setEmail(localStorage.getItem('email'));
  },[])

  const handleSignIn = () => {
      router.push('/signin')
  }
  const handleSendMessage = () => {
      const requestOptions = {
          headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "1",
          },
      }
      axios
      .post(
        AUTH_API.SEND_VERIFICATION_LINK,
        {
          email,
        },
        requestOptions,
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("New verification email is successfully sent. Please, check your email...", {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response // Destructure status directly
          if (status === 404) {
            toast.error("Unregistered email", {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else if (status === 500) {
            toast.error("Internal Server Error: Something went wrong on the server", {
              position: toast.POSITION.TOP_RIGHT,
            })
          } else {
            toast.error(`Error: ${status}`, { position: toast.POSITION.TOP_RIGHT })
          }
        } else {
          toast.error("Network Error: Unable to connect to the server", {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      })
      console.log("Send Message")
  }

  return (
    <div className="relative w-full h-screen md:flex flex-row overflow-y-auto sm:p-10 ">
        <div className="w-full h-full flex flex-col items-center justify-center">        
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-base">
                <Image src="/images/verify.svg" alt="PDF Document" width={150} height={150} className="ml-2" />
                <h3 className="text-2xl bold py-8">Verify your email to continue</h3>
                <p><span>We just sent an email to the address:</span>{email}</p>
                <p>Please check your email and select the link provided to verify your address.</p>
                <div className='flex flex-row gap-6 pt-10'>
                    <button type="button" className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out hidden sm:inline-block' onClick={handleSendMessage}>Resend email</button>
                    <button type="button" className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 ease-in-out hidden sm:inline-block' onClick={handleSignIn}>Back to login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendLinkPage
