import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { register } from '../../api/remote';
import useAuth from '../../validations/useAuth';

const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepeatPass] = useState('');

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

        if (password !== repeatPass) {
            toast.error('Both password must match.');
            return;
        }

        useAuth({
            func: register,
            username,
            password,
            message: 'User registration successful.',
            history: props.history
        });
    };

    return (
        <div id="register">
            <form onSubmit={onSubmitHandler}>
                <div className="container">
                    <h1>Register</h1>
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
                    <Input
                        name="repeatPass"
                        type="password"
                        value={repeatPass}
                        onChange={(e) => setRepeatPass(e.target.value)}
                        label="Repeat Password"
                    />
                    <hr />
                    <button type="submit" className="registerbtn">Register</button>
                </div>
                <div className="container signin">
                    <p>Already have an account?
                    <Link to="/login">Sign in</Link>.</p>
                </div>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);