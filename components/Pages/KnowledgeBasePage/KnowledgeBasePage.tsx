import Layout from "../../Layout"
import KnowledgeBases from "./KnowledgeBases"

const KnowledgeBasePage = () => (
  <Layout type="admin">
    <div className="p-[20px] w-full h-full flex flex-col">
      <KnowledgeBases />
    </div>
  </Layout>
)

export default KnowledgeBasePage
