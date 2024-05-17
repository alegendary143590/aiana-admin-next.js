// pages/reset-password/[token].js
import ResetPassword from '@/components/Pages/ResetPassword';

import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPass = () => {
    const router = useRouter();
    const { token } = router.query;

   

    return (
        <ResetPassword />
    );
};

export default ResetPass;
