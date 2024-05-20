import ChatbotPage from "@/components/Pages/ChatbotPage"
import withAuth from "@/providers/AuthContext"

const Chatbots = () => (
    <ChatbotPage />
)

export default withAuth(Chatbots)
