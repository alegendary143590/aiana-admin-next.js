import Users from "@/components/Pages/Users"
import { makeStaticProps, getStaticPaths } from "@/lib/getStatic"

const Dashboard = () => <Users />

export default Dashboard
const getStaticProps = makeStaticProps(['users' , 'common'  ])
export { getStaticPaths, getStaticProps }

