const Home = () => {
    return ( 
        <div className="home">

            <div className="row header">

                <h1 className="display-3 mb-0"> Hi <span className="fw-bold text-capitalize">{localStorage.getItem('auth_name')}, </span> </h1>
                <h1 className="display-1 my-0">Welcome to ABC</h1>
                { !localStorage.getItem('auth_name') && <p className="lead">Currently you are not logged in...</p> }
        
            </div>
            
        </div>
    );
}
 
export default Home;