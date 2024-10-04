import BillingPlanPage from "@/components/Pages/BillingPlanPage"
import { BillingInfoProvider } from '@/providers/BillingInfoProvider';

const BillingPlan = () => (
    <BillingInfoProvider>
        <BillingPlanPage />
    </BillingInfoProvider>        
)

export default BillingPlan

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}