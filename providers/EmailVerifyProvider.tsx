import React, { useState, useEffect, createContext, useContext } from 'react';
import Router from 'next/router';

const EmailVerifyContext = createContext(null);

export const useBillingInfo = () => useContext(EmailVerifyContext);

export const EmailVerifyProvider = ({ children }) => {
  const [verifyStatus, setVerifyStatus] = useState(null);
  const router = Router;

  useEffect(() => {
    console.log("This is provider.");
    const fetchBillingInfo = async () => {
      setVerifyStatus(localStorage.getItem('isVerified'));
    };

    fetchBillingInfo();
  }, []);

  if (verifyStatus === "true") {
    router.push("/signin");
  }

  return (
    <EmailVerifyContext.Provider value={verifyStatus}>
      {children}
    </EmailVerifyContext.Provider>
  );
};