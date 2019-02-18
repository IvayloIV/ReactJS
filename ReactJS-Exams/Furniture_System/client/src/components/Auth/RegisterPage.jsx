import React, { Component } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerAction, loginAction, redirect } from '../../actions/authActions';
import toastr from 'toastr';
import validationsRegister from '../../validations/register';

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
        
        const { name, email, password, repeat } = this.state;
        let validations = validationsRegister(name, email, password, repeat);
        if (validations.name !== '' || validations.email !== ''
            || validations.password !== '' || validations.repeat !== '') {
            toastr.error('First clear all errors.');
            return;
        }

        this.props.register(this.state.name, this.state.email, this.state.password);
    }

    componentDidMount() {
        if (localStorage.getItem('authToken')) {
            toastr.warning('You are logged.');
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.registerSuccess) {
            this.props.login(this.state.email, this.state.password);
        } else if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        const { name, email, password, repeat } = this.state;
        let validations = validationsRegister(name, email, password, repeat);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <Input
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeHandler}
                                label="Name"
                                validation={validations['name']}
                            />
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="E-mail"
                                validation={validations['email']}
                            />
                            <Input
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                type="password"
                                label="Password"
                                validation={validations['password']}
                            />
                            <Input
                                name="repeat"
                                value={this.state.repeat}
                                onChange={this.onChangeHandler}
                                type="password"
                                label="Repeat"
                                validation={validations['repeat']}
                            />
                            <input type="submit" className="btn btn-primary" value="Register" />
                        </div>
                    </div>
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
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));