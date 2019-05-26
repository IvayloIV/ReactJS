import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../common/Input';
import { registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: '',
            avatarUrl: '',
            email: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, password, repeatPass, avatarUrl, email } = this.state;

        if (!/[A-Za-z]{3,}/.test(username)) {
            toast.error('Invalid username.');
            return;
        }

        if (!/[A-Za-z0-9]{6,}/.test(password)) {
            toast.error('Invalid password.');
            return;
        }

        if (password !== repeatPass) {
            toast.error('Both passwords must match.');
            return;
        }

        this.props.register(username, password, avatarUrl, email);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.registerSuccess) {
            props.redirect();
            props.history.push('/');
        }

        return null;
    }

    render() {
        return (
            <div id="register">
                <form onSubmit={this.onSubmitHandler}>
                    <div className="container">
                        <h1>Register</h1>
                        <p id="details">Please fill in this form to create an account.</p>
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

                        <Input
                            name="repeatPass"
                            type="password"
                            value={this.state.repeatPass}
                            onChange={this.onChangeHandler}
                            label="Repeat password"
                        />

                        <Input
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                            label="Email"
                        />

                        <Input
                            name="avatarUrl"
                            value={this.state.avatarUrl}
                            onChange={this.onChangeHandler}
                            label="Avatar Url"
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
}

function mapState(state) {
    return {
        registerSuccess: state.register.success,
    };
}

function mapDispatch(dispatch) {
    return {
        register: (username, password, avatarUrl, email) => dispatch(registerAction(username, password, avatarUrl, email)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));