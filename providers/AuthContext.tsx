import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function withAuth(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true); // New state to track loading

        useEffect(() => {
            const checkAuth = async () => {
                const expiryTime = parseInt(localStorage.getItem('token_expiry'));

                if (expiryTime && expiryTime > Date.now()) {
                    setIsAuthenticated(true);
                    setLoading(false); // Set loading to false after checking
                } else {
                        setIsAuthenticated(false);
                        router.push('/signin');
                        setLoading(false); // Set loading to false if no refresh token
                }
            };

            checkAuth();
        }, [router]);

        // Show a loading state while authentication is being checked
        if (loading) {
            return <div>Loading...</div>;
        }

        return isAuthenticated ? <Component {...props} /> : null;
    };
}

export default withAuth;
