
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import BillingPlageTable from "./BillingPlanTable"
import Layout from "@/components/Layout";

const BillingPlagePage = () => {
  const toa = useTranslations("common");
  const router = useRouter()
  const handleClickBackButton = () => {
    router.push("/")
  }

  return (
    <Layout type="admin">
        <div className="w-full h-full pt-[30px] pb-[30px] overflow-y-auto flex items-center justify-center">
            <BillingPlageTable />
        </div>
    </Layout>
  )
}
    
  
export default BillingPlagePage