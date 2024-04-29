import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "@/components/Layout"
import KnowledgeBaseForm from "@/components/Pages/KnowledgeBasePage/KnowledgeBaseForm"

const EditPage = () => {
  const router = useRouter()
  const { base } = router.query

  useEffect(() => {
    console.log(`Editing item with knowledge: ${base}`)
  }, [base])

  return (
    <Layout type="admin">
      <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
        <KnowledgeBaseForm baseId={base} />
      </div>
    </Layout>
  )
}

export default EditPage
