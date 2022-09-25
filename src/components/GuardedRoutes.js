import { Route, Redirect } from "react-router-dom";

const GuardedRoutes = ({ component: Component, auth, user_id, ...rest}) => {

    console.log("checking...", auth, user_id);

    return (
        <Route {...rest} render={(props) => ( auth === true ? <Component {...props} user_id={user_id} /> : <Redirect to='/login' /> )} />
    );
}
 
export default GuardedRoutes;