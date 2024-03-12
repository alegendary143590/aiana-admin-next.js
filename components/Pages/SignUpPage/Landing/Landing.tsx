import { useRouter } from "next/router"
import Button from '@mui/material/Button';
import { useAuth } from "@/providers/AuthProvider"
import { STEPS } from "@/lib/consts/authStep"
import WelcomeText from "../../../WelcomeText"
import ClipSpan from "../../../ClipSpan"
import TextInput from "../../../TextInput"
import FadeIn from "../../../FadeIn"
import SocialButtons from "../../../SocialButtons"

const Landing = () => {
  const router = useRouter()
  const { setCurStep } = useAuth()

  return (
    <FadeIn className="flex h-full flex-col justify-end">
      <WelcomeText />
      <Button
        id="landing-btn"
        type="submit"
        className="my-[24.6px] h-[39.3px] w-full border-x-[1px] 
                border-b-[2px] 
                font-urwgeometric_bold text-black
                samsungS8:h-[44.3px]
                xs:my-[30px] xs:h-[48px]
                lg:my-[27.6px]"
                style={{backgroundColor:"#6666ff", marginTop:"40px", opacity:"65", color:"#fff", borderRadius:"30px"}}
        onClick={() => setCurStep(STEPS.INPUT_EMAIL)}
      >
        Sign up
      </Button>
      <p
        className="text-center font-urwgeometric
                text-[14px] text-gray_1"
      >
        Already have an account? &nbsp;
        <button type="button" style={{margin:"20px"}} onClick={() => router.push("/signin")}>
          <p className="text-[#fff] underline">
            Log In
          </p>
        </button>
      </p>
    </FadeIn>
  )
}

export default Landing
