import { useRouter } from "next/router"
import Form from "@/shared/Form"
import Media from "@/shared/Media"
import Button from "@mui/material/Button"
import { useAuth } from "@/providers/AuthProvider"
import SocialButtons from "../../../SocialButtons"
import InputForm from "../InputForm"
import { validation } from "./validation"

const EmailAndPassword = () => {
  const { login, loading } = useAuth()
  const router = useRouter()

  return (
    <Form onSubmit={login} validationSchema={validation} className="flex w-full flex-col">
      
      
      <InputForm />
      <button
        type="button"
        onClick={() => router.push("/forgotpass")}
        className="ml-[20px] flex
              items-center gap-x-[4px] pt-[8px]"
      >
        <Media
          type="image"
          link="/images/SignIn/info.svg"
          blurLink="/images/SignIn/info.png"
          containerClasses="w-[10px] aspect-[1/1]"
        />
        <p className="font-urwgeometric text-[12px] leading-[12px] text-gray_2 underline">
          Forgot Password?
        </p>
      </button>
      <Button
        id="log-in"
        type="submit"
        className="mt-[2vh] h-[48px] w-full font-urwgeometric_bold text-white text-lg shadow-[0px_0px_40px_0px_#a1ea0466]"
        style={{ backgroundColor:"#6666ff", borderRadius:"30px", marginTop:"30px" }}
        disabled={loading}
      >
        Log In
      </Button>
      <SocialButtons label="Log In" />
      <p
        className="pt-[2vh] text-center
                font-urwgeometric text-[14px] text-gray_1"
      >
        Don&rsquo;t have an account? &nbsp;
        <button type="button" onClick={() => router.push("/signup")}>
          <p className="underline  font-urwgeometric_bold ">
            Sign up
          </p>
        </button>
      </p>
    </Form>
  )
}

export default EmailAndPassword
