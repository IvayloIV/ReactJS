import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
            <form className="text-center p-5 form-layout" onSubmit={this.onSubmitHandler}>
                <p className="h4 mb-4">Sign in</p>
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
                <hr />
                <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit">Sign in</button>
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