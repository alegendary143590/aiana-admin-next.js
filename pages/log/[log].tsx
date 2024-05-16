import { useRouter } from "next/router"
import Chatlog from "@/components/Pages/Dashboard/Chatlog"

const Log = () => {
    const router = useRouter()
    const { session_id } = router.query;
    console.log("[log] page session_id is >>>>",session_id)
    return (
        <Chatlog session={session_id}/>
    )
}

export default Log
