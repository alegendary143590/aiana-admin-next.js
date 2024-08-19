import { useRouter } from "next/router"
import Chatlog from "@/components/Pages/Dashboard/Chatlog"
import { makeStaticProps , getStaticPaths } from "@/lib/getStatic";

const Log = () => {
    const router = useRouter()
    const { sessionId } = router.query;
    return (
        <Chatlog session={sessionId}/>
    )
}

export default Log
const getStaticProps = makeStaticProps(['dashboard', 'common'  ])
export { getStaticPaths, getStaticProps }
