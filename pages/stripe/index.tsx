import CheckoutButton from "@/components/CheckoutButton";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next Stripe</title>
            </Head>
            <div className="flex h-screen justify-center items-center">
                <div>
                    <CheckoutButton amount={10} />
                </div>
            </div>
        </>
    );
}