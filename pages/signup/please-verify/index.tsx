import { EmailVerifyProvider } from "@/providers/EmailVerifyProvider"
import SendLinkPage from "@/components/Pages/SendLinkPage"

const PleaseVerify = () => (
  <EmailVerifyProvider>
    <SendLinkPage />
  </EmailVerifyProvider>
)

export default PleaseVerify