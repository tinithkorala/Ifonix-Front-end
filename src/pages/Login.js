import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({handleAuthStatus, handleUserTypeStatus, handleUserId}) => {

    const history = useHistory();

    const [login_input, setLoginInput] = useState({
        'email' : '',
        'password' : '',
        'error_list' : []
    });

    const handleInput = (e) => {
        setLoginInput({
            ...login_input,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const submit_data_obj = {
            'email' : login_input.email,
            'password' : login_input.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/login', submit_data_obj).then(res => {

                if(res.data.status === 200) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.user_name);
                    localStorage.setItem('auth_id', res.data.user_id);
                    localStorage.setItem('auth_user_type', res.data.auth_user_type);
                    handleAuthStatus(true);
                    handleUserTypeStatus(localStorage.getItem('auth_user_type'));
                    handleUserId(localStorage.getItem('auth_id'));
                    console.log(res.data.message);
                    history.push('/dashboard');

                }else if(res.data.status === 401) {

                    setLoginInput({
                        ...login_input,
                        'error_list' : []
                    });
                    console.log(res.data.message);

                }else if(res.data.status === 400){

                    setLoginInput({
                        ...login_input,
                        'error_list' : res.data.validation_errors
                    });

                }

            });
        });

    }

    return (<div className="login align-middle">

                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <form onSubmit={handleSubmit}>

                            <h1 className="page-headings">Login</h1>

                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="text" className="form-control" name="email" onChange={handleInput} value={login_input.email} />
                                <p className="error-message"><b>{login_input.error_list.email}</b></p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleInput} value={login_input.password} />
                                <p className="error-message"><b>{login_input.error_list.password}</b></p>
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>
            
            </div>);
}
 
export default Login;