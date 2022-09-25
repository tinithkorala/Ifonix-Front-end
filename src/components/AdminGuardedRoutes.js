import { Redirect, Route } from "react-router-dom";

const AdminGuardedRoutes = ({component : Component, auth, userType, ...rest}) => {

    return (
        <Route
            {...rest}
            render ={(props) => (
                auth === true && parseInt(userType) === 1 ? <Component {...props}/> : <Redirect to='/dashboard' />
            )}
        >
        </Route>
    );
}
 
export default AdminGuardedRoutes;