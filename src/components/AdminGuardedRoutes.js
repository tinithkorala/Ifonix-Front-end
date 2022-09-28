import { Navigate, Outlet } from "react-router-dom";

const AdminGuardedRoutes = ({auth, userType}) => {

    return (
        auth === true && parseInt(userType) === 1 ? <Outlet /> : <Navigate to="/login" />
    );
}
 
export default AdminGuardedRoutes;