import useIsMobile from "@/hooks/useIsMobile"
import EmailPasswordForm from "./EmailPasswordForm"

const SignUpPage = () => {
  const isMobile = useIsMobile()

  return (
    <div
      className="no-scrollbar relative flex h-screen w-screen bg-center bg-cover items-center justify-center"
      style={{ backgroundImage: "url('/images/auth-bg-1.jpg')" }}
    >
      <EmailPasswordForm />
    </div>
  )
}

export default SignUpPage
