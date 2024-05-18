"use client!"

import ResetPassword from '@/components/Pages/ResetPassword';
import { useToken } from '@/providers/TokenContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ResetPass = () => {
    const router = useRouter();
    const { token } = router.query;
    const { setToken } = useToken();

    useEffect(() => {
        if (token) {
            setToken(token as string);
        }
    }, [token, setToken]);

    return (
            <ResetPassword /> 
    );
};

export default ResetPass;
