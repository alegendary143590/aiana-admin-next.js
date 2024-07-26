import Layout from "../../Layout"
import Chatbots from "./Chatbots"

const ChatbotPage = () => (
  <Layout type="admin">
    <div className="p-[20px] w-full h-full flex flex-col">
      <Chatbots />
    </div>
  </Layout>
)

export default ChatbotPage
