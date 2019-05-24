import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
        
        if (username.length < 3) {
            toast.error('Username should be at least 3 symbols.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password should be at least 6 symbols.');
            return;
        }

        this.props.login(username, password);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.loginSuccess) {
            props.redirect();
            props.history.push('/pet/all');
        }

        return null;
    }

    render() {
        return (
            <section className="login">
                <form onSubmit={this.onSubmitHandler}>
                    <fieldset>
                        <legend>Login</legend>
                        <p className="field">
                            <label htmlFor="username">Username</label>
                            <span className="input">
                                <Input
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeHandler}
                                    label="Username"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="password">Password</label>
                            <span className="input">
                                <Input
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                    label="Password"
                                />
                                <span className="actions"></span>
                                <i className="fas fa-key"></i>
                            </span>
                        </p>
                        <input className="button submit" type="submit" value="Login" />
                    </fieldset>
                </form>
            </section>
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
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(LoginPage));