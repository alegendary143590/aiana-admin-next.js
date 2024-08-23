import ChatbotPage from "@/components/Pages/ChatbotPage"

const Chatbots = () => (
    <ChatbotPage />
)

export default Chatbots
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}