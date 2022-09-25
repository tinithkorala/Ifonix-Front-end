import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import axios from "axios";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Create from './pages/Create';
import ManagePosts from './pages/ManagePosts';
import Search from './pages/Search';
import ViewPost from './pages/ViewPost';
import { useEffect, useState } from 'react';
import GuardedRoutes from './components/GuardedRoutes';
import AdminGuardedRoutes from './components/AdminGuardedRoutes';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem('auth_token');
	config.headers.Authorization = token ? `Bearer ${token}` : '';
	return config;
});


function App() {

	const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth_token') ? true : false);
	const [user_id, setUserId] = useState(localStorage.getItem('auth_id'));
	const [userType, setUserType] = useState(localStorage.getItem('auth_user_type'));

	const handleAuthStatus = (status) => {
		setIsAuthenticated(status);
	}

	const handleUserId = (status) => {
		setUserId(status);
	}

	const handleUserTypeStatus = (status) => {
		setUserType(status);
	}

    return (
		<Router>

			<Navbar handleAuthStatus={handleAuthStatus} isAuthenticated={isAuthenticated} userType={userType}></Navbar>	

			<div className="container">

				<Switch>
					
					<Route exact path="/">
					</Route>

					<Route path="/login">
						{	isAuthenticated ? 
							<Redirect to='/dashboard' /> : 
							<Login handleAuthStatus={handleAuthStatus} 
							handleUserTypeStatus={handleUserTypeStatus}  
							handleUserId={handleUserId} />
						}
					</Route>

					<Route path="/register">
						{	isAuthenticated ? 
							<Redirect to='/dashboard' /> : 
							<Register 
							handleAuthStatus={handleAuthStatus} 
							handleUserTypeStatus={handleUserTypeStatus}
							handleUserId={handleUserId} />
						}
					</Route>

					{/* this routs need to be protected */}
					{/* <Route path="/dashboard">
						<Dashboard></Dashboard>
					</Route> */}

					{/* <Route path="/posts-manage">
						<ManagePosts></ManagePosts>
					</Route>

					<Route path="/posts/create">
						<Create></Create>
					</Route>

					<Route path="/posts/search">
						<Search></Search>
					</Route>

					<Route path="/posts/:id">
						<ViewPost></ViewPost>
					</Route> */}

					{/* this routs need to be protected */}
					
					{/* Guarded routes start */}
					<GuardedRoutes path="/dashboard" component={Dashboard} auth={isAuthenticated} user_id={user_id} />
					<GuardedRoutes path="/posts/create" component={Create} auth={isAuthenticated} user_id={user_id} />
					<GuardedRoutes path="/posts/search" component={Search} auth={isAuthenticated} user_id={user_id} />
					<GuardedRoutes path="/posts/:id" component={ViewPost} auth={isAuthenticated} user_id={user_id} />
					{/* Guarded routes end */}

					{/* Admin Guarded routes start */}
					<AdminGuardedRoutes path="/posts-manage" component={ManagePosts} auth={isAuthenticated} userType={userType} />
					{/* Admin Guarded routes end */}

					
				</Switch>

			</div>
		</Router>
        
    );
}

export default App;
