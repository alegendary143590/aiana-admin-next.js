import React from "react"
import EmailPasswordForm from "./EmailPasswordForm"

function SignInPage() {
  return (
    <div
      className="no-scrollbar relative flex h-screen w-screen bg-center bg-cover items-center justify-center"
      style={{ backgroundImage: "url('/images/auth-bg-1.jpg')" }}
    >
      <EmailPasswordForm />
    </div>
  )
}

export default SignInPage
