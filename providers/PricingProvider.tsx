import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function PricingProvider(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        const pathname = usePathname()
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true); // New state to track loading
        useEffect(() => {
            const checkAuth = async () => {
                const expiryTime = parseInt(localStorage.getItem('token_expiry'));
                let status = localStorage.getItem('status');
                
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
        }, [pathname]);

        // Show a loading state while authentication is being checked
        if (loading) {
            return <div>Loading...</div>;
        }

        return (isAuthenticated) ? <Component {...props} /> : null;
    };
}

export default PricingProvider;
