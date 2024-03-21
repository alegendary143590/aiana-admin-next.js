import Account from "@/components/Account"
import Layout from "../../Layout"
import Chatbots from "./Chatbots"


const ChatbotPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
        <Account />
        <Chatbots />
    </div>
  </Layout>
)

export default ChatbotPage
