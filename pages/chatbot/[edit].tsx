import { GetStaticPaths } from "next";
import { useRouter } from "next/router"
import ChatbotForm from "@/components/ChatbotFrom"
import Layout from "@/components/Layout"

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
export async function getStaticProps(context) {
  return {
      props: {
          messages: (await import(`@/messages/${context.locale}.json`)).default
      }
  };
}
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [], // No pre-rendered paths
  fallback: 'blocking', // or 'true' for client-side rendering on unknown paths
})