import AdminPage from "@/components/Pages/AdminPage"
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic"

const Creator = () => <AdminPage />

export default Creator

const getStaticProps = makeStaticProps(['admin', 'common'])
export { getStaticPaths, getStaticProps }