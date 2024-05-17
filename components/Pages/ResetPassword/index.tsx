import React from "react"
import ResetPasswordPage from "./ResetPasswordPage"

function ResetPassword() {
  return (
    <div
      className="no-scrollbar relative flex h-screen w-screen bg-center bg-cover items-center justify-center"
      style={{ backgroundImage: "url('/images/auth-bg-1.jpg')" }}
    >
      <ResetPasswordPage />
    </div>
  )
}

export default ResetPassword