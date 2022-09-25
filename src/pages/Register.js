import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = ({handleAuthStatus, handleUserTypeStatus}) => {

    const history = useHistory();

    const [register_input, setRegisterInput] = useState({
        'name' : '',
        'email' : '',
        'password' : '',
        'password_confirmation' : '',
        'error_list_array' : []
    });

    const handleInput = (e) => {
        setRegisterInput({...register_input, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const submit_data_obj = {
            name : register_input.name,
            email : register_input.email,
            password : register_input.password,
            password_confirmation : register_input.password_confirmation,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('api/register', submit_data_obj).then(res => {

                if(res.data.status === 201) {

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.user_name);
                    localStorage.setItem('auth_user_type', res.data.auth_user_type);
                    handleAuthStatus(true);
                    handleUserTypeStatus(localStorage.getItem('auth_user_type'))
                    alert(res.data.message);
                    history.push('/dashboard');

                }else if(res.data.status === 400) {
                
                    setRegisterInput({...register_input, error_list_array : res.data.validation_errors});

                }

            });
        });
        
    }

    return (
        <div className="register">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>

                        <h1 className="page-headings">Register</h1>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={register_input.name} onChange={handleInput} />
                            <p className="error-message"><b>{register_input.error_list_array.name}</b></p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="text" className="form-control" name="email" value={register_input.email} onChange={handleInput} />
                            <p className="error-message"><b>{register_input.error_list_array.email}</b></p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" value={register_input.password} onChange={handleInput} />
                            <p className="error-message"><b>{register_input.error_list_array.password}</b></p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="password_confirmation" value={register_input.password_confirmation} onChange={handleInput} />
                            <p className="error-message"><b>{register_input.error_list_array.password}</b></p> 
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
            
        </div>
    );
}
 
export default Register;