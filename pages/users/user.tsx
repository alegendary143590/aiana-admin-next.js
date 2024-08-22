import UserPage from "@/components/Pages/Users/User"

const User = () => <UserPage />

export default User
export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}