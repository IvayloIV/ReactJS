import React from 'react';
import Input from './formFields/Input';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: ''
        };
    }

    onFormSubmitted = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;

        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                if (!d.success) {
                    this.setState({message: 'Invalid date!'});
                    return;
                }
                this.props.updateFunc(d);
            })
    }

    validateField(field) {
        if (field === '') {
            return false;
        }

        return true;
    }

    render() {
        let validObj = {
            email: this.validateField(this.state.email),
            password: this.validateField(this.state.password)
        }

        return (
            <form onSubmit={this.onFormSubmitted} id="Login-form">
                <p>{this.state.message}</p>
                <h2>Login</h2>
                <Input
                    type='text'
                    data='email'
                    name='Email'
                    value={this.state.email}
                    func={e => {
                        this.setState({ email: e.target.value, message: '' });
                    }}
                    valid={validObj.email}
                />
                <Input
                    type='password'
                    data='password'
                    name='Password'
                    value={this.state.password}
                    func={(e) => {
                        this.setState({ password: e.target.value, message: '' });
                    }}
                    valid={validObj.password}
                />
                <input
                    style={({ "display": (validObj.email && validObj.password) === true ? '' : 'none' })}
                    type='submit'
                    value='Login'
                />
            </form>
        );
    }
}

export default Login;