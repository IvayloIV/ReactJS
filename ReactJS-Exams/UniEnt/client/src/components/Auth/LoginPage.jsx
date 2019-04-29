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
            <form onSubmit={this.onSubmitHandler}>

                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Sign-In</h1>
                    <p>You are on one step of awesome events!</p>
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

                <button className="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>

                <div className="text-center mb-4">
                    <p className="alreadyUser"> Don't have account? Then just
                    <Link to="/register">Sign-Up</Link>!
                    </p>
                </div>

                <p className="mt-5 mb-3 text-muted text-center">© UniEnt - 2019.</p>

            </form>
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