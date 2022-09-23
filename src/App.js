import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import axios from "axios";
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
    return (
		<Router>
			<div className="container">

				<Navbar></Navbar>	

				<Switch>
					
					<Route exact path="/">
						<Dashboard></Dashboard>
					</Route>

					<Route path="/register">
						<Register></Register>
					</Route>
					
				</Switch>

			</div>
		</Router>
        
    );
}

export default App;
