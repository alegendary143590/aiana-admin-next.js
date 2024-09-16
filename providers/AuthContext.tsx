import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function withAuth(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const pathname = usePathname()
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true); // New state to track loading
        const [isPaymentAvailable, setIsPaymentAvailable] = useState(false)
        useEffect(() => {
            const checkAuth = async () => {
                const expiryTime = parseInt(localStorage.getItem('token_expiry'));
                const status = localStorage.getItem('status');
                
                if (expiryTime && expiryTime > Date.now()) {
                    setIsAuthenticated(true);
                    setLoading(false); // Set loading to false after checking
                } else {
                    // const refresh_token = localStorage.getItem('refresh_token');
                    // if (refresh_token) {
                    //     try {
                    //         const response = await axios.post(AUTH_API.REFRESH_TOKEN, { refresh_token }, {
                    //             headers: {
                    //                 'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
                    //                 'Content-Type': 'application/json',
                    //             }
                    //         });

                    //         if (response.status === 201) {
                    //             localStorage.setItem('token', response.data.access_token);
                    //             const updatedExpiryTime = new Date().getTime() + (60 * 60 * 1000);
                    //             localStorage.setItem('token_expiry', updatedExpiryTime.toString());
                    //             setIsAuthenticated(true);
                    //         } else {
                    //             setIsAuthenticated(false);
                    //             router.push('/signin');
                    //         }
                    //     } catch (error) {
                    //         setIsAuthenticated(false);
                    //         router.push('/signin');
                    //     } finally {
                    //         setLoading(false); // Set loading to false after processing
                    //     }
                    // } else {
                        setIsAuthenticated(false);
                        router.push('/signin');
                        setLoading(false); // Set loading to false if no refresh token
                    // }
                }
                if(status && status === 'active') {
                    setIsPaymentAvailable(true)
                } else {
                    setIsPaymentAvailable(false)
                    router.push("/pricing")
                }
            };
            checkAuth();
        }, [pathname]);

        // Show a loading state while authentication is being checked
        if (loading) {
            return <div>Loading...</div>;
        }

        return (isAuthenticated&&isPaymentAvailable) ? <Component {...props} /> : null;
    };
}

export default withAuth;
