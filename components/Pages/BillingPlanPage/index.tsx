import Layout from "@/components/Layout";
import withAuth from "@/providers/AuthContext"
import BillingPlageTable from "./BillingPlanTable"

const BillingPlagePage = () => (
    <Layout type="admin">
        <div className="w-full h-full pt-[30px] pb-[30px] overflow-y-auto flex items-center justify-center">
            <BillingPlageTable />
        </div>
    </Layout>
)    
  
export default withAuth(BillingPlagePage);