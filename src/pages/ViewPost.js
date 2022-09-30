import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

                if(res.status === 200)  {

                    setPost(res.data.data_set);

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

                if(error.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
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

    const navigate = useNavigate();

    const handleDelete = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.delete('api/posts/'+post.id)
            .then((res) => {
                if(res.data.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        text: res.data.message,
                    })
                    navigate('/dashboard');
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
                <div className="preview-post card card-margin">
                    <div className="card-body">
                        <h2 className="card-title">{post.title}</h2>
                        <p className="card-text">{post.description}</p>
                        {
                            parseInt(user_id) === parseInt(post.user_id) && (<button onClick={handleDelete} className="btn btn-danger">Delete</button>)
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ViewPost;