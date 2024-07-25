import React from "react"
import EmailPasswordForm from "./EmailPasswordForm"

function SignInPage() {
  return (
    <div className="relative w-full h-screen md:flex flex-row overflow-y-auto sm:p-10 ">
      <div className="md:w-1/2 display-none bg-[url('/images/sign-banner.png')] bg-center bg-no-repeat bg-contain bg-[#F0F0F0]" />
      <div className="w-full md:w-1/2 h-full">
        <EmailPasswordForm />
      </div>
    </div>
  )
}

export default SignInPage
