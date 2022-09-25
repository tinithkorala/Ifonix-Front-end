import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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
                    setPosts(res.data);
                    setIsLoadAgain(false);
                    console.log("fetching data");
                }else {
                    console.log("error while fetching data");
                }
            })
            .catch(err => {
                console.log(err);
            });
        });

    }

    const handleApproveReject = (e, id, status) => {

        const submit_data_obj = {
            'post_id' : id,
            'post_approve_reject_status' : status,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.put('api/posts-manage', submit_data_obj)
            .then((res) => {
                if(res.data.status === 200) {
                    setIsLoadAgain(true);
                    console.log(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
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