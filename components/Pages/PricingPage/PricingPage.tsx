
import PricingTable from "@/components/PricingTable"
import Layout from "../../Layout"

const PricingPage = () => (
  <Layout type="admin">
    <div className="px-[20px] py-[20px] w-full h-full flex flex-col">
      <PricingTable />
    </div>
  </Layout>
)

export default PricingPage