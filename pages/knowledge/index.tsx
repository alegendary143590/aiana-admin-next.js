import KnowledgeBasePage from "@/components/Pages/KnowledgeBasePage"
import withAuth from "@/providers/AuthContext"

const KnowledgeBase = () => <KnowledgeBasePage />

export default withAuth(KnowledgeBase)
