import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('api/posts')
            .then((res) => {
                if(res.status === 200) {
                    setPosts(res.data);
                }else {
                    console.log("error while fetching data")
                }
            })
            .catch(err => {
                console.log(err);
            });
        });

    }

    return (
           <div className="dashboard">
            <h1>Dashboard</h1>
            <Link to='/posts/create' className="btn btn-success btn-sm">Create New</Link>
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
  
    );

}
 
export default Dashboard;