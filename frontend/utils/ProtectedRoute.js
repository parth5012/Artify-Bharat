import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from './axiosConfig';

export default function ProtectedRoute({ children, requiredRole = null }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if token exists
                const token = localStorage.getItem('access_token');

                if (!token) {
                    console.log('❌ No token found, redirecting to login');
                    router.push('/login/login');
                    return;
                }

                // Verify token with backend
                const response = await api.post('/api/token/verify/', { token });

                if (response.status === 200) {
                    console.log('✅ Token verified');

                    // Check user role if required
                    if (requiredRole) {
                        const userRole = localStorage.getItem('user_role');

                        if (userRole !== requiredRole) {
                            console.log('❌ Unauthorized role:', userRole, 'Required:', requiredRole);
                            alert('You do not have permission to access this page');
                            router.push('/');
                            return;
                        }
                    }

                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error('❌ Auth check failed:', error);

                // Token invalid or expired
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_role');

                alert('Your session has expired. Please login again.');
                router.push('/login/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, requiredRole]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6f3] to-[#ede8e0]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#c2794d] mx-auto mb-4"></div>
                    <p className="text-[#6d5a3d]">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Show content only if authorized
    return isAuthorized ? children : null;
}
