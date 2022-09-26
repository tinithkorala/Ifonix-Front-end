import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ManagePosts = () => {

    const [posts, setPosts] = useState([]);
    const [is_loadAgain, setIsLoadAgain] = useState(false);

    useEffect(() => {
        getAllPosts();
    }, [is_loadAgain]);

    const getAllPosts = () => {

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.get('api/posts-approve-reject')
            .then((res) => {
                if(res.data.status === 200) {
                    setPosts(res.data.data_set);
                    setIsLoadAgain(false);
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

    const handleApproveReject = (e, id, status) => {

        const submit_data_obj = {
            'post_id' : id,
            'post_approve_reject_status' : status,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put('api/posts/'+id, submit_data_obj)
            .then((res) => {
                if(res.data.status === 201) {
                    setIsLoadAgain(true);
                    Swal.fire({
                        icon: 'success',
                        text: res.data.message,
                    })
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
            <h1>Manage Posts</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {posts && posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td>
                            <button type="button" onClick={(e) => handleApproveReject(e, post.id, true)}>Approved</button>
                            <button type="button" onClick={(e) => handleApproveReject(e, post.id, false)}>UnApproved</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            
        </div>
    );
}
 
export default ManagePosts;