import { useRouter } from "next/router"
import { useEffect } from "react"
import ChatbotForm from "@/components/ChatbotFrom"
import Layout from "@/components/Layout"

const ChatPage = () => {
    const router = useRouter()
    const { bot } = router.query

    useEffect(() => {
        // Fetch item details based on the chatbot query parameter
        // You can make an API call here to fetch the item details
        console.log(`Editing item with chatbot: ${bot}`)
    }, [bot])

    return (
        <Layout type="admin">
            <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
                <ChatbotForm bot={bot} />
            </div>
        </Layout>
    )
}

export default ChatPage
