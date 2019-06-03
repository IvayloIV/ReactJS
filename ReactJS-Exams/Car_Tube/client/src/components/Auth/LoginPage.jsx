import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { login } from '../../api/remote';
import useAuth from '../../validations/useAuth';

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!/[A-Za-z]{3,}/.test(username)) {
            toast.error('Invalid username.');
            return;
        }

        if (!/[A-Za-z0-9]{6,}/.test(password)) {
            toast.error('Invalid password.');
            return;
        }

        useAuth({ func: login, username, password, message: 'Login successfully.', history: props.history});
    };

    return (
        <div id="login">
            <form onSubmit={onSubmitHandler}>
                <div className="container">
                    <h1>Login</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <Input
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                    />
                    <button type="submit" className="registerbtn">Login</button>
                </div>
                <div className="container signin">
                    <p>Dont have an account?
                        <Link to="/register">Sign up</Link>.</p>
                </div>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);