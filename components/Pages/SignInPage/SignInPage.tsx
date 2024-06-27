import React from "react"
import EmailPasswordForm from "./EmailPasswordForm"

function SignInPage() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        height: '100vh',
        backgroundImage: "url('/images/auth-bg-1.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <EmailPasswordForm />
    </div>
  )
}

export default SignInPage
