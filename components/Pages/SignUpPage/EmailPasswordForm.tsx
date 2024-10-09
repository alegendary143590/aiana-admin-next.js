import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import router from "next/router"
import axios from "axios"
import { toast} from "react-toastify"
import { AUTH_API } from "@/components/utils/serverURL"
import Spinner from "@/components/Spinner"

import { validateForm } from "./validation"

function EmailPasswordForm() {
  const INITIAL_REGISTER_OBJ = {
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    email: "",
    language: "",
    com_name: "",
    com_vat: "",
    com_street: "",
    com_city: "",
    com_country: "",
    com_postal: "",
    com_street_number: "",
    com_website: "",
  }
  const [formState, setFormState] = useState(INITIAL_REGISTER_OBJ)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (id, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleAuth = async () => {
    toast.dismiss() // Dismiss any existing toasts
    const validationerror = validateForm(formState)
    if (validationerror !== "") {
      toast.error(validationerror, { 
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      })
      return false
    }
    
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
    }
    
    setIsSaving(true)
    await axios
      .post(AUTH_API.REGISTER, formState, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          toast.error("Successfully registered!", { 
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Close after 3 seconds
          })
          router.push("/signin")
          setIsSaving(false)
          setIsSaved(true)
          return
        }
        if (response.status === 409) {
          setIsSaving(false)
          toast.error("User already exists!", { position: toast.POSITION.TOP_RIGHT })
        }
        if (response.status === 400) {
          setIsSaving(false)
          toast.error("Invalid email!", { position: toast.POSITION.TOP_RIGHT })
        }
      })
      .catch((error) => {
        setIsSaving(false)
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("User already exists!", { position: toast.POSITION.TOP_RIGHT })
          } else {
            console.log("Error status code:", error.response.status)
            console.log("Error response data:", error.response.data)
            toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
          }

          // Handle the error response as needed
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error request:", error.request)
          toast.error(error.request, { position: toast.POSITION.TOP_RIGHT })
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message)
          toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
        }
      })
    return true
  }

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col h-full justify-center">
        <div className="w-full">
          <div className="px-5 lg:3/5 md:w-5/6 w-full flex flex-col justify-between h-full mx-auto overflow-y-auto">
            <div>
              <img src="/images/logo_big.png" alt="Logo" className="h-12 sm:mb-5 mb-5" />
              <div className="sm:flex hidden">
                <div className="flex-col">
                  <h1 className="text-[1.3rem] font-bold">We’re glad to see you here!</h1>
                  <p className="mt-2">Create your account and start exploring...</p>
                </div>
              </div>
            </div>
            <div className="sm:mt-5">
              <div className="w-full flex flex-col gap-[2vh]">
                <div>
                  <p className="font-bold">First Name</p>
                  <div className="px-[1px]">
                    <input
                      id="first_name"
                      type="text"
                      className="rounded-lg border-gray-400 w-full"
                      value={formState.first_name}
                      placeholder="Enter your first name"
                      onChange={(e) => {
                        handleInputChange("first_name", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">Last Name</p>
                  <div className="px-[1px]">
                    <input
                      id="last_name"
                      type="text"
                      className="rounded-lg border-gray-400 w-full"
                      value={formState.last_name}
                      placeholder="Enter your last name"
                      onChange={(e) => {
                        handleInputChange("last_name", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <div className="px-[1px]">
                    <input
                      id="email"
                      className="rounded-lg border-gray-400 w-full"
                      value={formState.email}
                      placeholder="Enter your email address"
                      onChange={(e) => {
                        handleInputChange("email", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">Create Password</p>
                  <div className="px-[1px]">
                    <input
                      id="password"
                      type="password"
                      className="rounded-lg border-gray-400 w-full"
                      value={formState.password}
                      placeholder="Enter your password"
                      onChange={(e) => {
                        handleInputChange("password", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold">Confirm Password</p>
                  <div className="px-[1px]">
                    <input
                      id="confirm_password"
                      type="password"
                      className="rounded-lg border-gray-400 w-full"
                      value={formState.confirm_password}
                      placeholder="Re-enter your password"
                      onChange={(e) => {
                        handleInputChange("confirm_password", e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div>
                  <button
                    id="signup"
                    type="button"
                    className="mt-1 rounded-lg w-full h-[48px] bg-[linear-gradient(180deg,#6BA4F1_0%,#A438FA_100%)] text-white font-bold text-[16px] transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] active:scale-[.99]"
                    onClick={(isSaved || isSaving) ? ()=> {} : handleAuth}
                  >
                    {isSaving ? <Spinner color=""/> : "Sign Up"}
                  </button>
                  <div className="text-center mt-2">
                    <p>
                      Already have an account?&nbsp;
                      <Link href="/signin">
                        <span className="font-bold cursor-pointer">Sign in now</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center sm:p-2 px-5 mt-5 lg:3/5 md:w-5/6 w-full mx-auto">
          By continuing, you agree to our{" "}
          <Link href="/tos">
            <span className="font-bold underline cursor-pointer">Terms of Service</span>
          </Link>{" "}
          and{" "}
          <Link href="/privacy">
            <span className="font-bold underline cursor-pointer">Privacy Policy</span>
          </Link>
          .
        </div>
        <div className="absolute right-5 bottom-5 sm:right-0 sm:bottom-0 cursor-pointer">
          <Image src="/images/chatbot.png" alt="chatbot" width={50} height={50} />
        </div>
      </div>
    </div>
  )
}

export default EmailPasswordForm
