import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import { loginAction, redirect } from '../../actions/authActions';
import Input from '../common/Input';
import toastr from 'toastr';
import validationsLogin from '../../validations/login';

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
        const { email, password } = this.state;
        let validations = validationsLogin(email, password);
        if (validations.email !== '' || validations.password !== '') {
            toastr.error('First clear all errors.');
            return;
        }

        this.props.login(this.state.email, this.state.password)
            .then((json) => {
                if (json.success) {
                    toastr.success('Login successful.');
                }
            });
    }
    
    componentDidMount() {
        if (localStorage.getItem('authToken')) {
            toastr.warning('You are logged.');
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        const { email, password } = this.state;
        let validations = validationsLogin(email, password);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <Input
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeHandler}
                                    label="E-mail"
                                    validation={validations['email']}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangeHandler}
                                    label="Password"
                                    validation={validations['password']}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
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
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(LoginPage));