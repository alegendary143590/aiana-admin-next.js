

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)
const endpointSecret = process.env.WEBHOOK_SECRET;

const handleCompletedCheckoutSession = async (event:Stripe.CheckoutSessionCompletedEvent) => {
    try {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            (event.data.object as any).id,
            {
                expand:["line_items"],
            }
        );

        const lineItems = sessionWithLineItems.line_items;

        if(!lineItems) return false;
        
        console.log(lineItems)

        return true;
    } catch(err:any){
        console.error(err)
        return false;

    }
}
export async function POST(req:NextRequest) {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch(err:any) {
        console.error(err);
        return NextResponse.json({error:err.message}, {status:400})
    }
    switch(event.type){
        case "checkout.session.completed":
            {
                const savedSession = await handleCompletedCheckoutSession(event);
                if(!savedSession){
                    return NextResponse.json(
                        {error:"Unable to save checkout session"},
                        {status:500}
                    );
                }
                break;
            }
        case "customer.subscription.updated":
            {
                console.log("customer.subscription.updated is called!@")
                break;
            }
        default:
            console.log("Other case is called")
            break;
    }
}


