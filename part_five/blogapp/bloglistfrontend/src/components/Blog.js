import React, { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const [blogVisible, setBlogVisible] = useState(false);
    const [postedBy, setPostedBy] = useState('')
    const [username, setUsername] = useState('')

    const hideWhenVisible = { display : blogVisible ? 'none' : '' };
    const showWhenVisible = { display : blogVisible ? '' : 'none' };

    const likeBlog = async (e) => {
        e.preventDefault();
        
        const newBlog = {
            id: blog.id,
            user: blog.user,
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
        };

        await blogService.update(
            blog, newBlog
        );
    };

    return (
        <div style={blogStyle}>
            <div>
                <div style={hideWhenVisible}>
                    <p>{blog.title} {blog.author}</p>
                    <button onClick={() => setBlogVisible(true)}>view</button>
                </div>
                <div style={showWhenVisible}>
                    <p>{blog.title} {blog.author}</p>
                    <a href='/'>{blog.url}</a>
                    <p>Likes: {blog.likes}<button type='submit' onClick={likeBlog}>like</button></p>
                    <p>Posted by: {blog.user?.name}
                    </p>
                    <button onClick={() => setBlogVisible(false)}>hide</button>
                </div>
            </div>  
        </div>  
    );
};

export default Blog;