import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import { registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
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

        this.props.register(username, password);
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
            <section className="register">
                <form onSubmit={this.onSubmitHandler}>
                    <fieldset>
                        <legend>Register</legend>
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
                        <input className="button submit" type="submit" value="Register" />
                    </fieldset>
                </form>
            </section>
        );
    }
}

function mapState(state) {
    return {
        registerSuccess: state.register.success
    };
}

function mapDispatch(dispatch) {
    return {
        register: (username, password) => dispatch(registerAction(username, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));