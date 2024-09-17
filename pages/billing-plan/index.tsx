import BillingPlanPage from "@/components/Pages/BillingPlanPage"

const BillingPlan = () => (
    <BillingPlanPage />
)

export default BillingPlan

export async function getStaticProps(context) {
    return {
        props: {
            messages: (await import(`@/messages/${context.locale}.json`)).default
        }
    };
}