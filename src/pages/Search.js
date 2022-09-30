import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Search = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get(`api/posts/search/?search=${search}`)
            .then((res) => {

                if(res.status === 200) {

                    setPosts(res.data.data_set);

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
        });
        

    }

    return (
        <div className="content">

            <div className="row header">
                <h1 className="col-6">Search Posts</h1>
                <div className="col-6">
                    <form onSubmit={handleSubmit} className="float-end">
                        <div className="input-group mt-2">
                            <input type="text" name="search_data" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" />
                            <button className="btn btn-primary">Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <p>{posts ? posts.length : 0} records found</p>

            <div className="col-md-12">
                {posts && posts.map(post => (
                    <div className="card card-margins" key={post.id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.description}</p>
                            <Link to={`posts/${post.id}`} className="btn btn-primary">View</Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
 
export default Search;