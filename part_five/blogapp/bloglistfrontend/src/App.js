import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

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

    return (
        <div>
            <h1>Blog App</h1>
            {user === null ?
                loginForm() :
                <div>
                      <p>{user.name} logged in</p>
                      <button onClick={handleLogout}>Logout</button>
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