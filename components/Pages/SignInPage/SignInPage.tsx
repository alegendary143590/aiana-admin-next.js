import React from "react"
import EmailPasswordForm from "./EmailPasswordForm"

function SignInPage() {
  return (
    <div
      className="relative flex h-screen bg-center bg-cover items-center justify-center"
      style={{ backgroundImage: "url('/images/auth-bg-1.jpg')", minHeight:'100vh' }}
    >
      <EmailPasswordForm />
    </div>
  )
}

export default SignInPage
