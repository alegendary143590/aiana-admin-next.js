import { useRouter } from "next/router"
import signInWithGoogle from "@/lib/firebase/signInWithGoogle"
import signInWithTwitter from "@/lib/firebase/signWithTwitter"

const useSocialLogin = () => {
  const router = useRouter()

  const twitterSign = async () => {
    const response: any = await signInWithTwitter()
    if (response?.error) return

    router.push("/dashboard")
  }

  const googleSign = async () => {
    const response: any = await signInWithGoogle()
    if (response?.error) return

    router.push("/dashboard")
  }

  return {
    twitterSign,
    googleSign,
  }
}

export default useSocialLogin
