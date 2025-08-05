import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = () => {
    const { logout } = useAuth()
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin')

    // Check both token and admin status
    const isAuthenticated = token && isAdmin === 'true';

    // Verify token expiration
    const isTokenExpired = () => {
        if (!token) return true;
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            return tokenData.exp * 1000 < Date.now();
        } catch (error) {
            console.error('Error verifying token:', error);
            return true;
        }
    };

    if (!isAuthenticated || isTokenExpired()) {
        // localStorage.removeItem('token');
        // localStorage.removeItem('isAdmin');
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;