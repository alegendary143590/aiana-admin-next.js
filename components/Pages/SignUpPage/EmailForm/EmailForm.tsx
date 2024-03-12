import { useRouter } from "next/router"
import Form from "@/shared/Form"
import Button from "@mui/material/Button";
import { useAuth } from "@/providers/AuthProvider"
import TextInput from "../../../TextInput"
import SocialButtons from "../../../SocialButtons"
import { validation } from "./validation"

const EmailForm = () => {
  const { userEmail, setUserEmail, checkEmail } = useAuth()
  const router = useRouter()

  return (
    <Form
      onSubmit={checkEmail}
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
      />
      <Button
        id="create-email"
        type="submit"
        className="mt-[20px] h-[48px] w-full font-urwgeometric_bold text-lg samsungS8:mt-[25px] xs:mt-[30px]"
          style={{backgroundColor:"#6666ff", marginTop:"20px", opacity:"65", color:"#fff", borderRadius:"30px"}}
        >
        Sign up
      </Button>
      <SocialButtons label={"Sign up"} />
      <p
        className="pt-[20px] text-center
          font-urwgeometric text-[14px] text-gray_1 samsungS8:pt-[25px]"
      >
        Already have an account? &nbsp;
        <button type="button" onClick={() => router.push("/signin")}>
          <p className="text-[#fff] underline">
            Log In
          </p>
        </button>
      </p>
    </Form>
  )
}

export default EmailForm
