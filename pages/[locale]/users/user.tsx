import UserPage from "@/components/Pages/Users/User"
import { makeStaticProps , getStaticPaths } from "@/lib/getStatic"

const User = () => <UserPage />

export default User

const getStaticProps = makeStaticProps(['admin' , 'common'  ])
export { getStaticPaths, getStaticProps }