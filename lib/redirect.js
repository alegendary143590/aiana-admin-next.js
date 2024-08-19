// Adjusted redirect.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import languageDetector from './languageDetector';

export const useRedirect = (originalTo) => {
  const router = useRouter();
  const to = originalTo || router.asPath;

  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (
      to.startsWith(`/${detectedLng}`) &&
      router.route === '/404'
    ) {
      router.replace(`/${detectedLng}${router.route}`);
      return;
    }

    languageDetector.cache(detectedLng);
    router.replace(`/${detectedLng}${to}`);
  }, [to]);
};

// Adjusted Redirect to be a functional component
export const Redirect = ({ to }) => {
  useRedirect(to);
  return null;
};