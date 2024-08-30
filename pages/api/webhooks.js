import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
    api: {
        bodyParser: false,
    },
};

async function handleWebhookEvent(req, res) {
    const sig = req.headers['stripe-signature'];
    const buf = await buffer(req);

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`Payment successful for session ID: ${session.id}`);
            // Handle post-payment actions here
            break;

        // Add other event types to handle as needed

        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).end();
}

export default handleWebhookEvent;