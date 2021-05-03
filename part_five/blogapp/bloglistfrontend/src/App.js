import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
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
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log(window.localStorage);

        window.localStorage.removeItem('loggedBlogappUser');
        setUser(null);
    };

    const createBlog = async (e) => {
        e.preventDefault();

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
    }

    const loginForm = () => {
      return (
          <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                    username
                        <input
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                    password
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        );
    };

    const blogForm = () => {
        return (
            <div>
                <form onSubmit={createBlog}>
                    <div>
                        title
                        <input
                            type='text'
                            value={title}
                            name='Title'
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author
                        <input
                            type='text'
                            value={author}
                            name='Author'
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url
                        <input
                            type='text'
                            value={url}
                            name='Url'
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>  
        );
    };

    return (
        <div>
            <h1>Blog App</h1>
            {user === null ?
                loginForm() :
                <div>
                      <p>{user.name} logged in</p>
                      <button onClick={handleLogout}>Logout</button>
                      {blogForm()}
                      <h2>blogs</h2>
                      {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                      )}
                </div>
            }
        </div>
    );
};

export default App;