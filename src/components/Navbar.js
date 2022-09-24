import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const logoutSubmit = (e) => {

        axios.post('api/logout').then(res => {

            if(res.data.status === 200) {

                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                console.log(res.data.message)
                history.push('/login');

            }

        });

    }

    let auth_buttons = "";

    if(!localStorage.getItem('auth_token')) {

        auth_buttons = (<div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link active">Register</Link>
                                </li>
                            </ul>
                        </div>);

    }else {

        auth_buttons = (<div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <button type="button" onClick={logoutSubmit}>Logout</button>
                                </li>
                            </ul>
                        </div>);

    }

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                                </a>
                            
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>

                        
                        {auth_buttons}

                    </div>
                </div>
            </nav>);
}
 
export default Navbar;