import KnowledgeBasePage from "@/components/Pages/KnowledgeBasePage"

const KnowledgeBase = () => <KnowledgeBasePage />

export default KnowledgeBase
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}