import React from "react"
import { ToastContainer, toast } from "react-toastify"
import Link from "next/link"
import router from "next/router"
import Image from "next/image"

import { loginUser } from "@/components/utils/common"

const EmailPasswordForm = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleAuth = async () => {
    if (email === "") {
      return false
    }
    if (password === "") {
      toast.error("Password is required!", { position: toast.POSITION.TOP_RIGHT })
      return false
    }
    try {
      await loginUser(email, password)
      router.push("/admin")
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
    }
    return true
  }
  /* eslint-disable */
  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value)
  }
  /* eslint-enable */

  return (
    <div className="flex flex-col w-full h-full justify-center relative">
      <div className="px-5 lg:3/5 md:w-5/6 w-full flex flex-col h-full mx-auto overflow-y-auto">
        <div className="mt-10">
          <img src="/images/logo_big.png" alt="Logo" className="h-12 sm:mb-10 mb-5" />
          <div className="flex mb-5">
            <h1 className="text-[1.3rem] font-bold">Welcome Back</h1>
          </div>
        </div>
        <form className="sm:mt-10 w-full flex flex-col gap-[3vh]">
          <div>
            <label htmlFor="username" className="font-bold">
              Username/Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={handleEmailChange}
              className="rounded-lg border-gray-400 w-full text-[.9rem]"
              placeholder="Enter your username/email"
            />
          </div>

          <div>
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="rounded-lg border-gray-400 w-full text-[.9rem]"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col">
            <button
              id="signin"
              type="button"
              className="mt-1 mb-5 rounded-lg w-full h-[48px] bg-[linear-gradient(180deg,#6BA4F1_0%,#A438FA_100%)] text-white font-bold text-[16px] transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] active:scale-[.99]"
              onClick={handleAuth}
            >
              Log In
            </button>

            <Link href="/forgot">
              <span className="ml-auto text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                Forgot password?
              </span>
            </Link>
          </div>
        </form>
        <div className="text-center mt-5 ">
          <p>
            Already have an account?&nbsp;
            <Link href="/signup">
              <span className="pl-3 font-bold cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
        <div className="text-center sm:p-2 px-5 mt-[10vh] lg:3/5 md:w-5/6 w-full mx-auto">
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
