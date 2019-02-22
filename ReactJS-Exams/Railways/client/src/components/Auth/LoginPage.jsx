import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { connect } from 'react-redux';
import { loginAction, redirect } from '../../actions/authActions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

        const {email, password} = this.state;
        if (email === '') {
            toast.error('Email is empty.');
            return;
        }

        if (password.length < 4) {
            toast.error('Password must be more than 4 symbols.');
            return;
        }

        this.props.login(this.state.email, this.state.password)
            .then(json => {
                if (json.msg) {
                    return;
                }
                
                if (json.success) {
                    toast.success(json.message);
                } else {
                    toast.error(json.message);
                }
            });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <h2>Log In:</h2>
                <form onSubmit={this.onSubmitHandler} className="register-form">
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

                    <input type="submit" className="login" value="Login" />
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
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default connect(mapState, mapDispatch)(LoginPage);
