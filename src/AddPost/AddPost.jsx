import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../_services';


function AddPost() {
    
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    }
    const addPost = () => {
        userService.addpost(title, subject);
    }
    return (
        <div className="col-md-6 col-md-offset-3">
            <p>Add post <Link to="/">Home</Link> <Link to="/add">Add</Link> <Link to="/login">Logout</Link></p>
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input value={title} type="text" onChange={handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                        </div>

                        <div className="form-group">
                            <textarea value={subject} className="form-control" onChange={handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxLength="140" rows="7"></textarea>
                        </div>
                        <Link to="/"><button type="button" onClick={addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { AddPost };