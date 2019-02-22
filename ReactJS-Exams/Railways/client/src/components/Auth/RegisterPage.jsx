import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { connect } from 'react-redux';
import { loginAction, registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {name, email, password, repeat} = this.state;

        if (name === '') {
            toast.error('Name is empty.');
            return;
        }

        if (email === '') {
            toast.error('Email is empty.');
            return;
        }

        if (password.length < 4) {
            toast.error('Password must be more than 4 symbols.');
            return;
        }

        if (password !== repeat) {
            toast.error('Password must match.');
            return;
        }

        this.props.register(this.state.name, this.state.email, this.state.password)
            .then(json => {
                if (json.success) {
                    toast.success('Register successful.');
                } else {
                    toast.error(json.message);
                }
            });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.registerSuccess) {
            const { email, password } = this.state;
            this.props.login(email, password, true);
        } else if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <h2>Create your account:</h2>
                <form onSubmit={this.onSubmitHandler} className="register-form">
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
                        label="Email"
                    />
                    <Input
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                        type="password"
                    />
                    <Input
                        name="repeat"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat"
                        type="password"
                    />
                    <input type="submit" className="register" value="Register" />

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