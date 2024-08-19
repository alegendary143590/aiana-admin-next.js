import ChatbotPage from "@/components/Pages/ChatbotPage"
import { makeStaticProps, getStaticPaths } from "@/lib/getStatic"

const Chatbots = () => (
    <ChatbotPage />
)

export default Chatbots
const getStaticProps = makeStaticProps(['chatbot', 'common'])
export { getStaticPaths, getStaticProps }
