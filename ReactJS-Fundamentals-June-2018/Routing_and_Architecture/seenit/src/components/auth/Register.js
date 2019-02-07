import React from 'react';
import { toast } from 'react-toastify';
import observer from '../../utils/observer';
import api from '../../utils/api';
import history from '../../history';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: ''
        }
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitClicked = (event) => {
        event.preventDefault();

        const payload = { 
            username: this.state.username, 
            password: this.state.password 
        };

        if (!/^[A-Za-z]{3,}$/.test(payload.username)) {
            toast.error('Invalid username!');
            return;
        }

        if (!/^[A-Za-z0-9]{6,}$/.test(payload.password)) {
            toast.error('Invalid password!');
            return;
        }

        if (this.state.repeatPass !== payload.password) {
            toast.error('Passwords must match!');
            return;
        }

        api.register(payload)
        .then(d => d.json())
        .then(parsedData => {
            observer.invokeFunc('setUserData', {
                token: parsedData._kmd.authtoken,
                username: parsedData.username,
                userId: parsedData._id
            });

            localStorage.setItem('token', parsedData._kmd.authtoken);
            localStorage.setItem('username', parsedData.username);
            localStorage.setItem('userId', parsedData._id);
            
            this.setState({
                username: '',
                password: '',
                repeatPass: ''
            });

            history.push('/catalog');
            toast.success('User registration successful.');
        }).catch(() => {
            toast.error('Invalid credentials!');
        });
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.onSubmitClicked}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" type="text" value={this.state.username} onChange={this.onChanged} />
                <label>Password:</label>
                <input name="password" type="password" value={this.state.password} onChange={this.onChanged} />
                <label>Repeat Password:</label>
                <input name="repeatPass" type="password" value={this.state.repeatPass} onChange={this.onChanged} />
                <input id="btnRegister" value="Sign Up" type="submit" />
            </form>
        );
    };
}

export default Register;

