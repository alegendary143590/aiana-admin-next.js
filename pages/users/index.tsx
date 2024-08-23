import Users from "@/components/Pages/Users"

const Dashboard = () => <Users />

export default Dashboard
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}