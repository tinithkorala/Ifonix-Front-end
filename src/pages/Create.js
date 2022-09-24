import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Create = () => {

    const history = useHistory();

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

                if(res.data.status === 400) {
                    setPostInput({
                        ...post_input,
                        'error_list_array' : res.data.validation_errors
                    });
                }else if(res.data.status === 200) {
                    setPostInput({
                        ...post_input,
                        'error_list_array' : []
                    }); 
                    console.log(res.data.message);
                    history.push('/dashboard');
                }

            })
            .catch(err => {
                console.log(err);
            });

        });

    }

    return (
        <div className="create-view">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">Title</label>
                    <input type="text" name="title" onChange={handleInput} value={post_input.name} className="form-control" />
                    <p className="error-message"><b>{post_input.error_list_array.title}</b></p>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Description</label>
                    <textarea type="text" name="description" onChange={handleInput} value={post_input.description} className="form-control"></textarea>
                    <p className="error-message"><b>{post_input.error_list_array.description}</b></p>
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
 
export default Create;