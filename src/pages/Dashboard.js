import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Dashboard = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('api/posts')
            .then((res) => {
                if(res.data.status === 200) {
                    setPosts(res.data.data_set);
                }else if(res.data.status === 503) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Try Again Later',
                });
            });
        });

    }

    return (
        <div className="dashboard">

            <div className="row header">

                <h1 className="col-6">Dashboard</h1>

                <div className="col-6">
                    <Link to='/posts/create' className="btn btn-success float-end" >Create New</Link>
                </div>

            </div>

            {posts && posts.map(post => (
                <div className="card card-margins mb-4" key={post.id}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary">View</Link>
                    </div>
                </div>
            ))}
            
        </div>
    );

}
 
export default Dashboard;