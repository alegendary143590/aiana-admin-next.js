import useIsMobile from "@/hooks/useIsMobile"
import Layout from "../../Layout"
import EnterEmailAndPassword from "./EnterEmailAndPassword"

const SignInPage = () => {
  const isMobile = useIsMobile()

  return (
    <Layout type={isMobile ? "mobile" : "auth"}>
        <EnterEmailAndPassword />
    </Layout>
  )
}

export default SignInPage
