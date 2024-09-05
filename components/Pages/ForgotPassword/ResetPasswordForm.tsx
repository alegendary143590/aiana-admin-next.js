import React, { useState } from "react"
import { toast } from "react-toastify"
import Link from "next/link"
import axios from "axios"

import { AUTH_API } from "@/components/utils/serverURL"

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("")

  const handleSendButton = () => {
    if (email !== "") {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
      }

      axios
        .post(
          AUTH_API.FORGOT_PASSWORD,
          {
            email,
          },
          requestOptions,
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Check your email.  Sent the reset password link!", {
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
    } else {
      toast.error("Please enter your email", { position: toast.POSITION.TOP_RIGHT })
    }
  }

  return (
    <div className="w-[450px] bg-gray-100 flex flex-col justify-center items-center md:p-5 p-2">
      <div className="w-full">
        <div>
          <div className="flex flex-col text-center text-sm">
            <div className="relative ">
              <img
                src="/images/logo_big.png"
                alt="Logo"
                className="absolute left-1/2 -translate-x-1/2 mx-auto h-20"
              />
            </div>
            <h5 className="mt-[100px] font-bold text-xl">
              Reset Password
            </h5>
            Forgot your password? No problem.
          </div>
          <div className="bg-[#44D7C9] p-3 text-[14px] mt-10 m-[15px] flex items-center justify-center">
            Enter your email and instructions will be sent to you!
          </div>

          <div
            className="mt-10 flex flex-col mx-3"
          >
            <label htmlFor="email" className="font-mono">
              Email
            </label>

            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              className="bg-white mt-1 rounded-md text-sm"
            />

            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={handleSendButton}
                className="mt-3 bg-[#A438FA] w-[95px] text-white rounded-md p-1"
              >
                Reset
              </button>
            </div>
            <div className="text-center">
              <p>
                Or go to&nbsp;
                <Link href="/signin">
                  <span className="text-black font-bold cursor-pointer">Sign in</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
