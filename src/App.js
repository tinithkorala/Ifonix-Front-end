import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import axios from "axios";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Create from './pages/Create';
import ManagePosts from './pages/ManagePosts';
import Search from './pages/Search';
import ViewPost from './pages/ViewPost';
import { useState } from 'react';
import GuardedRoutes from './components/GuardedRoutes';
import AdminGuardedRoutes from './components/AdminGuardedRoutes';
import Home from './pages/Home';

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

				<Routes>
					
					<Route path="/" element={<Home />} />

					<Route 
						path="/login" 
						element={
							isAuthenticated ? 
							<Navigate to="/dashboard" /> :   
							<Login 
								handleAuthStatus={handleAuthStatus} 
								handleUserTypeStatus={handleUserTypeStatus}  
								handleUserId={handleUserId} 
							/>
						}
					/>

					<Route 
						path="/register"
						element={
							isAuthenticated ? 
							<Navigate to="/dashboard" /> :
							<Register 
								handleAuthStatus={handleAuthStatus} 
								handleUserTypeStatus={handleUserTypeStatus}  
								handleUserId={handleUserId} 
							/>
						}
					/>

					{/* Protected_routes_start */}
					<Route element={<GuardedRoutes auth={isAuthenticated} />} >
						<Route path='/dashboard' element={<Dashboard />}></Route>
						<Route path='/posts/create' element={<Create />}></Route>
						<Route path='/search' element={<Search />}></Route>
						<Route path='/posts/:id' element={<ViewPost user_id={user_id}/>} ></Route>
					</Route>
					
					<Route element={<AdminGuardedRoutes auth={isAuthenticated} userType={userType} />} >
						<Route path='posts-manage' element={<ManagePosts />}></Route>
					</Route>
					{/* Protected_routes_end */}
	
				</Routes>

			</div>

		</Router>
        
    );
}

export default App;
