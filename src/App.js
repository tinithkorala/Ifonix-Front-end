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

	const handleAuthStatus = (status) => {
		setIsAuthenticated(status);
	}

    return (
		<Router>

			<Navbar handleAuthStatus={handleAuthStatus} isAuthenticated={isAuthenticated}></Navbar>	

			<div className="container">

				<Switch>
					
					<Route exact path="/">
					</Route>

					<Route path="/login">
						{isAuthenticated ? <Redirect to='/dashboard' /> : <Login handleAuthStatus={handleAuthStatus}  />}
					</Route>

					<Route path="/register">
						{isAuthenticated ? <Redirect to='/dashboard' /> : <Register handleAuthStatus={handleAuthStatus}/>}
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
					<GuardedRoutes path="/dashboard" component={Dashboard} auth={isAuthenticated} />
					<GuardedRoutes path="/posts-manage" component={ManagePosts} auth={isAuthenticated} />
					<GuardedRoutes path="/posts/create" component={Create} auth={isAuthenticated} />
					<GuardedRoutes path="/posts/search" component={Search} auth={isAuthenticated} />
					<GuardedRoutes path="/posts/:id" component={ViewPost} auth={isAuthenticated} />
					{/* Guarded routes end */}
					
				</Switch>

			</div>
		</Router>
        
    );
}

export default App;
