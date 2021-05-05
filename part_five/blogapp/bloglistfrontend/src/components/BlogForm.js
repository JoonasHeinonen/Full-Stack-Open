import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const addBlog = (e) => {
        e.preventDefault();

        createBlog({
            title: title,
            author: author,
            url: url
        });

        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;