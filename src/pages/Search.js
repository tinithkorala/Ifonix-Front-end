import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get(`api/posts/search/?search=${search}`)
            .then((res) => {
                if(res.status === 200) {
                    setPosts(res.data);
                }else {
                    console.log("error while fetching data")
                }
            })
        });
        

    }

    return (
        <div className="content">
            <h1>Search Posts</h1>
            <div className="col-md-10">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="search_data" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" />
                    <button>Search</button>
                </form>
            </div>

            <div className="col-md-10">
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