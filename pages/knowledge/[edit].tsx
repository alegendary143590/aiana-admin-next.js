import { useRouter } from "next/router"
import { useEffect } from "react"
import Account from "@/components/Account"
import Layout from "@/components/Layout"
import KnowledgeBaseForm from "@/components/Pages/KnowledgeBasePage/KnowledgeBaseForm"

const EditPage = () => {
    const router = useRouter()
    const { base } = router.query

    useEffect(() => {
        // Fetch item details based on the chatbot query parameter
        // You can make an API call here to fetch the item details
        console.log(`Editing item with knowledge: ${base}`)
    }, [base])

    return (
        <Layout type="admin">
            <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
                <Account />
                <KnowledgeBaseForm knowledge_base={base} />
            </div>
        </Layout>
    )
}

export default EditPage