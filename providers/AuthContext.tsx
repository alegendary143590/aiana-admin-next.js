import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AUTH_API } from '@/components/utils/serverURL';
import axios from 'axios';

function withAuth(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        useEffect(() => {
            const token = localStorage.getItem('token');
            const expiryTime = parseInt(localStorage.getItem('token_expiry'));

            if (!token || expiryTime < Date.now()) {
                const refresh_token = localStorage.getItem('refresh_token');
                // console.log(refresh_token)
                if(refresh_token){
                    axios
                    .post(AUTH_API.REFRESH_TOKEN, { refresh_token }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,  // Example for adding Authorization header
                            'Content-Type': 'application/json',  // Explicitly defining the Content-Type
                        }
                    })
                    .then((response) => {
                    if (response.status === 201) {
                          localStorage.setItem('token', response.data.access_token)
                        }
                    })
                    .catch(() => {
                        router.push('/signin'); // Redirect to login if no token or token has expired
                    })
                } else {
                    router.push('/signin'); // Redirect to login if no token or token has expired
                }
            }            
        }, []);

        return <Component {...props} />;
    };
}

export default withAuth;
