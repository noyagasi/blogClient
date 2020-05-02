import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../_services';


function HomePage() {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        userService.getAllPosts().then(str => setPosts(JSON.parse(str)));
        userService.getUsername().then(str => setUsername(str));
    }, []);

    const deletePost = (id) => {
        userService.deletePost(id);
        userService.getAllPosts().then(str => setPosts(JSON.parse(str)));
    };

    return (
        <div className="col-md-6 col-md-offset-3">
            <p>React blog app <Link to="/">Home</Link> <Link to="/add">Add</Link> <Link to="/login">Logout</Link></p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Author</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts && posts.map((post) => (
                            <tr key={post._id} >
                                <td>{post.titl}</td>
                                <td>{post.subj}</td>
                                <td>{post.usr}</td>
                                <td>
                                    <Link to={`/edit/${post._id}`}><span className="glyphicon glyphicon-pencil"></span></Link>
                                </td>
                                <td>
                                    <Link to="/"><span onClick={() => deletePost(post._id)} className="glyphicon glyphicon-remove"></span></Link>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            <h5>You're connected as {username}</h5>
        </div>
    );

}

export { HomePage };