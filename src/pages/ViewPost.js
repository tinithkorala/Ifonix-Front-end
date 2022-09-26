import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const ViewPost = (props) => {

    const user_id = props.user_id;

    const {id} = useParams();

    const [post, setPost] = useState()

    useEffect(() => {
        getPost();
    }, []);

    const getPost = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('api/posts/'+id)
            .then((res) => {

                if(res.data.status === 200)  {

                    setPost(res.data.data_set);

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

    const history = useHistory()

    const handleDelete = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.delete('api/posts/'+post.id)
            .then((res) => {
                if(res.data.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        text: res.data.message,
                    })
                    history.push('/dashboard');
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
        <div className="content">
            <h1>View Post</h1>
            {post && (
                <div className="preview-post">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    {
                        user_id == parseInt(post.user_id) && (<button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>)
                    }
                    
                </div>
            )}
        </div>
    );
}
 
export default ViewPost;