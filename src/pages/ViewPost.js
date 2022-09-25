import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const ViewPost = () => {

    const {id} = useParams();

    const [post, setPost] = useState()

    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.get('api/posts/'+id)
        .then((res) => {
            setPost(res.data);
        });
    });

    const history = useHistory()

    const handleDelete = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.delete('api/posts/'+post.id)
            .then((res) => {
                if(res.status == 200) {
                    if(res.data) {
                        console.log('Post Deleted');
                        history.push('/dashboard');
                    }
                }
            });
        });

    }

    return (
        <div className="content">
            <h1>View Post</h1>
            {post && (
                <div className="preview-post">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
                </div>
            )}
        </div>
    );
}
 
export default ViewPost;