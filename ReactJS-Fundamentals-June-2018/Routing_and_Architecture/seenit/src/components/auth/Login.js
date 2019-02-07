import React from 'react';
import { toast } from 'react-toastify';
import history from '../../history';
import observer from '../../utils/observer';
import api from '../../utils/api';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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

        api.login(payload)
            .then(d => d.json())
            .then(parsedData => {
                localStorage.setItem('token', parsedData._kmd.authtoken);
                localStorage.setItem('username', parsedData.username);
                localStorage.setItem('userId', parsedData._id);

                observer.invokeFunc('setUserData', {
                    token: parsedData._kmd.authtoken,
                    username: parsedData.username,
                    userId: parsedData._id
                });

                this.setState({
                    username: '',
                    password: ''
                });

                history.push('/catalog');
                toast.success('Login successful.');
            })
            .catch(() => {
                toast.error('Invalid credentials!');
            });
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.onSubmitClicked}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" type="text" value={this.state.username} onChange={this.onChanged} />
                <label>Password:</label>
                <input name="password" type="password" value={this.state.password} onChange={this.onChanged} />
                <input id="btnLogin" value="Sign In" type="submit" />
            </form>
        );
    };
}

export default Login;

