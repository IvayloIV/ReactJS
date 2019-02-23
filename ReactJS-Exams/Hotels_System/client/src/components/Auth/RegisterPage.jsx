import React, { Component } from 'react';
import Input from '../common/Input';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {  loginAction, registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { name, email, password } = this.state;
        if (email === '') {
            toast.error('Email is empty.');
            return;
        }

        if (name === '') {
            toast.error('Name is empty.');
            return;
        }

        if (password.length < 4) {
            toast.error('Password is too short.');
            return;
        }

        this.props.register(name, email, password)
            .then((json) => {
                if (!json.success) {
                    toast.error(json.message);
                    return;
                }

                this.props.login(this.state.email, this.state.password, 'Register');
            });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.loginSuccess) {
            props.redirect();
            props.history.push('/');
        }

        return null;
    }

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success,
        loginSuccess: state.login.success
    };
}

function mapDispatch(dispatch) {
    return {
        register: (name, email, password) => dispatch(registerAction(name, email, password)),
        login: (email, password, msg) => dispatch(loginAction(email, password, msg)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(RegisterPage);