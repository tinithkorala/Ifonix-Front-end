import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import axios from "axios";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Create from './pages/Create';

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
    return (
		<Router>

			<Navbar></Navbar>	

			<div className="container">

				<Switch>
					
					<Route exact path="/">
					</Route>

					<Route path="/login">
						{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
					</Route>

					<Route path="/register">
						{localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
					</Route>
					
					<Route path="/dashboard">
						<Dashboard></Dashboard>
					</Route>

					<Route path="/posts/create">
						<Create></Create>
					</Route>

					{/* <Route path="/dashboard">
						{localStorage.getItem('auth_token') ?  <Dashboard />  : <Redirect to='/login' from='/dashboard'/>}
					</Route> */}
					
				</Switch>

			</div>
		</Router>
        
    );
}

export default App;