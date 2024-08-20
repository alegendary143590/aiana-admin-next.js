import ChatbotForm from "@/components/ChatbotFrom"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"

const EditPage = () => {
  const router = useRouter();
  const {bot} = router.query;
  // console.log("Bot >>", bot)
  return (
    <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <ChatbotForm bot={bot}/>
    </div>
  </Layout>
  )
}
    
export default EditPage
