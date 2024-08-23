import AdminPage from "@/components/Pages/AdminPage"

const Creator = () => (
    <AdminPage />
)

export default Creator

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}