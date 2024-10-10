import Layout from "@/components/Layout";
import PricingTable from "@/components/PricingTable"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

const PricingTablePage = () => {
  const toa = useTranslations("common");
  const router = useRouter()
  // const handleClickBackButton = () => {
  //   router.push("/")
  // }

  return (
    <Layout type="admin">
      <div className="p-[20px] w-full h-full flex flex-col">
        {/* <div className="relative w-screen h-screen pt-20 pb-20" style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}> */}
            {/* <button type="button" className="underline rounded-md text-gray-500 hover:text-gray-700 absolute top-8 left-20" onClick={handleClickBackButton}>{toa("Back")}</button> */}
          <PricingTable />
        {/* </div> */}
      </div>
    </Layout>
  )
}
    
  
export default PricingTablePage