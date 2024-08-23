import TicketsPage from "@/components/Pages/TicketsPage"

const Dashboard = () => (
    <TicketsPage />
)

export default Dashboard
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}