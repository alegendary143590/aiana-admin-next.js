import { useRouter } from "next/router"
import { useEffect } from "react"
import { GetStaticPaths } from "next"
import Layout from "@/components/Layout"
import KnowledgeBaseForm from "@/components/Pages/KnowledgeBasePage/KnowledgeBaseForm"

const EditPage = () => {
  const router = useRouter()
  let baseId: string | null = router.query.baseId as string

  // Check if baseId is not yet available and we have a stored value

  useEffect(() => {
    if (!baseId) {
      const storedBaseId = localStorage.getItem("lastBaseId")
      baseId = storedBaseId
    } else {
      localStorage.setItem("lastBaseId", baseId)
    }
  }, [baseId])

  return (
    <Layout type="admin">
      <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
        <KnowledgeBaseForm baseId={baseId} />
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