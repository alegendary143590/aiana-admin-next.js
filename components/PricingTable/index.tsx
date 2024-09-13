import React, { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const PricingTable = () => {
  const router = useRouter();

  useEffect(() => {
    const stripeSessionId = localStorage.getItem('stripeCustomerId');
    if (!stripeSessionId) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <>
      <Script
        async
        src="https://js.stripe.com/v3/pricing-table.js"
        strategy="lazyOnload"
      />
      <stripe-pricing-table
        pricing-table-id="prctbl_1PqTIF2NgSmULURo3IA6uISx"
        publishable-key="pk_test_51PoLRr2NgSmULURopab8U64Ys08JZdwROxdECldsro2tYAj3ZZgjYU0mHbX3R0aqjEMy4thOymsYPPrZWJNDt98A00Zo66nnVb"
        customer-session-client-secret={localStorage.getItem('stripeCustomerId')}
      />
    </>
  );
};

export default PricingTable;