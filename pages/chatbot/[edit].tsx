import { useRouter } from "next/router"
import { useEffect } from "react"
import Account from "@/components/Account"
import ChatbotForm from "@/components/ChatbotFrom"
import Layout from "@/components/Layout"

const EditPage = () => {
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
                <Account />
                <ChatbotForm bot={bot} />
            </div>
        </Layout>
    )
}

export default EditPage