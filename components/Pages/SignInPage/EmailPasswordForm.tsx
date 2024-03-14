import { useRouter } from "next/router"
import { useState } from "react"
import Form from "@/shared/Form"
import Button from "@mui/material/Button"
// import { useAuth } from "@/providers/AuthProvider"
import TextInput from "../../TextInput"
import { validation } from "./validation"

const EmailPasswordForm = () => {
//   const { userEmail, setUserEmail, checkEmail } = useAuth()
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    router.push("/dashboard")
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={validation}
      className="flex w-full grow flex-col justify-end"
    >
      <TextInput
        type="text"
        id="useremail"
        name="useremail"
        value={userEmail}
        onChange={setUserEmail}
        placeholder="Enter Email..."
        label=""
      />
      <TextInput
        type="password"
        id="userpassword"
        name="userpassword"
        value={userPassword}
        onChange={setUserPassword}
        placeholder="Enter Password..."
        label=""
      />
      <Button
        id="btn_signin"
        type="submit"
        className="mt-[20px] h-[48px]
                !bg-[#6366f1] text-white text-lg
                rounded-[30px]"
        >
        Sign In
      </Button>
      <p
        className="pt-[20px] text-center
          font-urwgeometric text-[14px] text-gray_1 samsungS8:pt-[25px]"
      >
        Don&apos;t have account yet? &nbsp;
        <button type="button" onClick={() => router.push("/signin")}>
          <p className="text-[#fff] underline">
            Sign Up
          </p>
        </button>
      </p>
    </Form>
  )
}

export default EmailPasswordForm
