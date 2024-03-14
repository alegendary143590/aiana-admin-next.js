import FadeIn from "../../FadeIn"
import WelcomeText from "../../WelcomeText"
import EmailPasswordForm from "./EmailPasswordForm"

const EnterEmailAndPassword = () => {

  return (
    <FadeIn className="flex h-full flex-col justify-between md:grow">
      <WelcomeText />
      <EmailPasswordForm />
    </FadeIn>
  )
}

export default EnterEmailAndPassword
