import { useRouter } from "next/router"
import Chatlog from "@/components/Pages/Dashboard/Chatlog"

const Log = () => {
    const router = useRouter()
    const { sessionId } = router.query;
    return (
        <Chatlog session={sessionId}/>
    )
}

export default Log
