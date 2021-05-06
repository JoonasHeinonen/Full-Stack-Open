import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Error from './components/Error';
import LoginForm from './components/Login';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [loginVisible, setLoginVisible] = useState(false);
    const [blogFormVisible, setBlogFormVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            );

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');

            setNotificationMessage(`${user.username} logged in!`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        } catch (exception) {
            setErrorMessage('Credentials are wrong! Either username or password is incorrect.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null);
            setNotificationMessage('User logged out!');
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        } catch (exception) {
            setErrorMessage('Logging out was insuccessful.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const createBlog = async () => {
        try {
            const blog = {
                user: user,
                title: title,
                author: author,
                url: url
            };

            const auth = user.token;

            const newBlog = await blogService.create(blog, auth);
            setBlogs(blogs.concat(newBlog));
            setTitle('');
            setAuthor('');
            setUrl('');

            setNotificationMessage(`Created a new blog: User ${user.username} posted '${blog.title}' by ${author}!`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        } catch (exception) {
            setErrorMessage('Error occurred while creating a blog: Blog creation halted.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => {
        const hideWhenVisible = { display : loginVisible ? 'none' : '' };
        const showWhenVisible = { display : loginVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setLoginVisible(true)}>log in</button>
                </div>
                <div style={showWhenVisible}>
                    <LoginForm
                        handleSubmit={handleLogin}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        username={username}
                        password={password}
                    />
                    <button onClick={() => setLoginVisible(false)}>cancel</button>
                </div>
            </div>
        );
    };

    const blogForm = () => {
        const hideWhenVisible = { display : blogFormVisible ? 'none' : '' };
        const showWhenVisible = { display : blogFormVisible ? '' : 'none' };

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setBlogFormVisible(true)}>Create new blog</button>
                </div>
                <div style={showWhenVisible}>
                    <BlogForm
                        createBlog={createBlog}
                    />
                    <div>
                        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1>Blog App</h1>
            <Error message={errorMessage} />
            <Notification message={notificationMessage} />
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                    {blogForm()}
                    <h2>blogs</h2>
                    {blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog => (
                            <Blog key={blog.id} blog={blog} />
                        ))}
                </div>
            }
        </div>
    );
};

export default App;