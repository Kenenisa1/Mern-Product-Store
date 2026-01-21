import { Navigate } from 'react-router-dom';
import { useUserStore } from '../Store/user';

export const AdminRoute = ({ children }) => {
    const { user } = useUserStore();
    
    if (!user || user.isAdmin !== true) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default AdminRoute;