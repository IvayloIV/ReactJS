import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { loginAction, redirect } from '../../actions/authActions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
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
        const { username, password } = this.state;

        if (!/[A-Za-z]{3,}/.test(username)) {
            toast.error('Invalid username.');
            return;
        }

        if (!/[A-Za-z0-9]{6,}/.test(password)) {
            toast.error('Invalid password.');
            return;
        }

        this.props.login(username, password);
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
            <div id="login">
                <form onSubmit={this.onSubmitHandler}>
                    <div className="container">
                        <h1>Login</h1>
                        <p id="details">Please enter your credentials.</p>
                        <hr id="login-register-hr" />

                        <Input
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            label="Username"
                        />

                        <Input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
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
}

function mapState(state) {
    return {
        loginSuccess: state.login.success
    };
}

function mapDispatch(dispatch) {
    return {
        login: (username, password) => dispatch(loginAction(username, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(LoginPage));