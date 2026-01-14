import { Navigate } from 'react-router-dom';
import { useUserStore } from '../Store/user';

export const ProtectedRoute = ({ children }) => {
    const { user, token } = useUserStore();
    
    if (!user || !token) {
        // Redirect to signin if not logged in
        return <Navigate to="/signin" replace />;
    }
    
    return children;
};

export default ProtectedRoute;