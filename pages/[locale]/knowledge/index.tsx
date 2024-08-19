import KnowledgeBasePage from "@/components/Pages/KnowledgeBasePage"
import { makeStaticProps , getStaticPaths } from "@/lib/getStatic"

const KnowledgeBase = () => <KnowledgeBasePage />

export default KnowledgeBase
const getStaticProps = makeStaticProps(['knowledge' , 'common'  ])
export { getStaticPaths, getStaticProps }