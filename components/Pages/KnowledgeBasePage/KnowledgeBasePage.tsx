import Account from "@/components/Account"
import Layout from "../../Layout"
import KnowledgeBaseForm from "./KnowledgeBaseForm"
import KnowledgeBases from "./KnowledgeBases"

const KnowledgeBasePage = () => (
    <Layout type="admin">
        <div className="px-[20px] py-[20px] w-full h-full flex flex-col gap-y-[20px]">
            <Account />
            <KnowledgeBases />
        </div>
    </Layout>
)



export default KnowledgeBasePage