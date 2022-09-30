import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = ({handleAuthStatus, isAuthenticated, userType}) => {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {

        axios.post('api/logout').then(res => {

            if(res.status === 200) {

                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                handleAuthStatus(false);
                console.log(res.data.message)
                navigate('/login');

            }

        })
        .catch(error => {

            console.log(error.response);

            if(error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Unauthenticated'
                });
            }

            if(error.response.status === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
            }

        });

    }

    let auth_buttons = "";
    let protected_links = "";

    if(!isAuthenticated) {

        auth_buttons = (<div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link rounded active">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link rounded active">Register</Link>
                                </li>
                            </ul>
                        </div>);

        protected_links = (<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>)

    }else {

        auth_buttons = (<div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <button className="btn btn-outline-danger border-2 fw-semibold" type="button" onClick={logoutSubmit}>Logout</button>
                                </li>
                            </ul>
                        </div>);

        protected_links =   (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link rounded active mx-2" aria-current="page" to="/dashboard">Dashboard</Link>
                                </li>
                                {(parseInt(userType) === 1) && 
                                    (<li className="nav-item">
                                        <Link className="nav-link rounded active mx-2" aria-current="page" to="/posts-manage">Manage Posts</Link>
                                    </li>)
                                }
                                <li className="nav-item">
                                    <Link className="nav-link rounded active mx-2" aria-current="page" to="/search">Search Posts</Link>
                                </li>
                            </ul>);

    }

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand me-5" to='/'>ABC</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        {protected_links}
                        
                        {auth_buttons}

                    </div>
                </div>
            </nav>);
}
 
export default Navbar;