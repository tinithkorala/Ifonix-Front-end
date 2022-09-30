import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Create = () => {

    const navigate = useNavigate();

    const [post_input, setPostInput] = useState({
        'title' : '',
        'description' : '',
        'error_list_array' : []
    })

    const handleInput = (e) => {

        setPostInput({...post_input, [e.target.name] : e.target.value});

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const submit_data_obj = {

            title : post_input.title,
            description : post_input.description,

        }

        axios.get('/sanctum/csrf-cookie').then(response => {

            axios.post('api/posts', submit_data_obj)
            .then((res) => {

                if(res.status === 201) {
                    setPostInput({
                        ...post_input,
                        'error_list_array' : []
                    }); 
                    Swal.fire({
                        icon: 'success',
                        text: res.data.message,
                    })
                    navigate('/dashboard');
                }

            })
            .catch(error => {

                console.log(error.response);

                if(error.response.status === 400) {
                    setPostInput({
                        ...post_input,
                        'error_list_array' : error.response.data.validation_errors
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
        <div className="create-view">

            <div className="row">

                <div className="col-md-4 offset-md-4">

                    <form onSubmit={handleSubmit}>

                        <h1 className="text-center">Create Post</h1>

                        <div className="mb-3">
                            <label  className="form-label">Title</label>
                            <input type="text" name="title" onChange={handleInput} value={post_input.name} className="form-control" />
                            <p className="text-danger fw-light"><b>{post_input.error_list_array.title}</b></p>
                        </div>

                        <div className="mb-3">
                            <label  className="form-label">Description</label>
                            <textarea type="text" name="description" onChange={handleInput} value={post_input.description} className="form-control"></textarea>
                            <p className="text-danger fw-light"><b>{post_input.error_list_array.description}</b></p>
                        </div>
            
                        <button type="submit" className="btn btn-primary">Create Post</button>
                    
                    </form>

                </div>

            </div>

        </div>
    );
}
 
export default Create;