import React, { useState, useEffect, createContext, useContext } from 'react';
import { getBillingInfo } from '@/components/utils/common';

const BillingInfoContext = createContext(null);

export const useBillingInfo = () => useContext(BillingInfoContext);

export const BillingInfoProvider = ({ children }) => {
  const [billingInfo, setBillingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("This is provider.");
    const fetchBillingInfo = async () => {
      try {
        const email = localStorage.getItem("email");
        if (email) {
          await getBillingInfo(email);
          setBillingInfo({
            status: localStorage.getItem('status'),
            plan: localStorage.getItem('plan')
          });
        }
      } catch (error) {
        console.error("Error fetching billing info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, []);

  if (loading) {
    return <div>Loading billing information...</div>;
  }

  return (
    <BillingInfoContext.Provider value={billingInfo}>
      {children}
    </BillingInfoContext.Provider>
  );
};