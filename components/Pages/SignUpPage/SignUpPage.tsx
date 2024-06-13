import EmailPasswordForm from "./EmailPasswordForm"

const SignUpPage = () => (
  <div
    className="relative flex h-[100vh] overflow-auto w-screen bg-center bg-cover items-start lg:pt-[100px] pt-[30px]  justify-center"
    style={{ backgroundImage: "url('/images/auth-bg-1.jpg')" }}
  >
    <EmailPasswordForm />
  </div>
)

export default SignUpPage
