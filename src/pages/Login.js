const Login = () => {
    return (<div className="login">

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form>

                            <h1 className="page-headings">Login</h1>

                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="text" className="form-control" name="email" />
                                <p className="error-message"><b></b></p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password"/>
                                <p className="error-message"><b></b></p>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>

                        </form>
                    </div>
                </div>
            
            </div>);
}
 
export default Login;