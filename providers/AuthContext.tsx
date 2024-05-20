import { useRouter } from 'next/router';
import { useEffect } from 'react';

function withAuth(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // Redirect to login if no token
            }
        }, []);

        return <Component {...props} />;
    };
}

export default withAuth;
