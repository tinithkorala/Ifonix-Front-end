import { Navigate, Outlet } from "react-router-dom";

const GuardedRoutes = ({auth}) => {

    return (
        auth === true ? <Outlet /> : <Navigate to="/login"/>
    );

}
 
export default GuardedRoutes;