import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
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

                if(res.status === 200) {
                    setPosts(res.data.data_set);
                    setIsLoadAgain(false);
                }else if(res.status === 503) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message,
                    });
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

    const handleApproveReject = (e, id, status) => {

        const submit_data_obj = {
            'post_id' : id,
            'post_approve_reject_status' : status,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put('api/posts/'+id, submit_data_obj)
            .then((res) => {

                if(res.status === 201) {
                    setIsLoadAgain(true);
                    Swal.fire({
                        icon: 'success',
                        text: res.data.message,
                    })
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

                if(error.response.status === 503) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message,
                    });
                }

            });
        });
    }

    return (
        <div className="content">
            <h1>Manage Posts</h1>
            <table className="table table-hover">

                <colgroup>
                    <col width="15%"/>
                    <col width="65%"/>
                    <col width="20%"/>
                </colgroup>

                <thead>
                    <tr>
                        <th className="text-center" scope="col">Title</th>
                        <th className="text-center" scope="col">Description</th>
                        <th className="text-center" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {posts && posts.map(post => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td className="text-center">
                            <div className="btn-group">
                                <button className="btn btn-success" type="button" onClick={(e) => handleApproveReject(e, post.id, true)}>Approve</button>
                                <button className="btn btn-danger" type="button" onClick={(e) => handleApproveReject(e, post.id, false)}>Reject</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            
        </div>
    );
}
 
export default ManagePosts;