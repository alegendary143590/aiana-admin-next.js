import { useRouter } from "next/router"
import { useEffect } from "react"
import ChatbotForm from "@/components/ChatbotFrom"
import Layout from "@/components/Layout"
import withAuth from "@/providers/AuthContext"

const EditPage = () => {
  const router = useRouter()
  const { bot } = router.query;

  return (
    <Layout type="admin">
      <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
        <ChatbotForm bot={bot} />
      </div>
    </Layout>
  )
}

export default withAuth(EditPage)
