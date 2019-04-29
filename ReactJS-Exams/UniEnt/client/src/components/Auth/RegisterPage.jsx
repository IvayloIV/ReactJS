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
            rePassword: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, password, rePassword } = this.state;

        if (username.length < 3) {
            toast.error('Username must be at least 3 symbols.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 symbols.');
            return;
        }

        if (password !== rePassword) {
            toast.error('Passwords must match.');
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
            <form onSubmit={this.onSubmitHandler}>
                <div className="text-center mb-4">
                <h1 className="h3 mb-3 font-weight-normal">Sign-Up</h1>
                <p>Register yourself once and create/join awesome events!</p>
                </div>

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
                    name="rePassword"
                    type="password"
                    value={this.state.rePassword}
                    onChange={this.onChangeHandler}
                    label="Re-Password"
                />

                <button className="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>

                <div className="text-center mb-4">
                <p className="alreadyUser"> Already have account? Then just
                    <Link to="/login">Sign-In</Link>!
                </p>
                </div>

                <p className="mt-5 mb-3 text-muted text-center">© UniEnt - 2019.</p>
        </form>
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