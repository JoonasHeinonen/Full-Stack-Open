import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = React.forwardRef(({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {

    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                username
                    <input
                        type='text'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                password
                    <input
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;