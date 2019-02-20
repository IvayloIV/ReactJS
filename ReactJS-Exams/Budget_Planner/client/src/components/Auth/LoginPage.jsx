import React, { Component } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loginAction, redirect } from '../../actions/authActions';
import validator from '../../validations/login';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailValidation: '',
            passwordValidation: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ 
            [name]: value, 
            [`${name}Validation`]: validator[name](value) 
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {email, password, emailValidation, passwordValidation} = this.state;
        if (emailValidation !== '' || passwordValidation !== '') {
            toastr.error('Check for form for errors.');
            return;
        }

        this.props.login(email, password).then(json => {
            if (json.success) {
                toastr.success('Logged successful.');
            } else {
                toastr.error(json.message);
            }
        });
    }

    componentDidMount() {
        if (localStorage.getItem('authToken')) {
            toastr.warning('You have already log in.');
            this.props.history.push('/');
            return;
        }

        const { email, password } = this.state;
        this.setState({
            emailValidation: validator.email(email),
            passwordValidation: validator.password(password),
        });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loginSuccess) {
            this.props.redirect();
            this.props.history.push('/');
        }
    }

    render() {
        const {emailValidation, passwordValidation} = this.state;
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-3">
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="E-mail"
                                validation={emailValidation}
                            />
                            <Input
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                                type="password"
                                validation={passwordValidation}
                            />
                            <input type="submit" className="btn btn-secondary" value="Login" />
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

export default connect(mapState, mapDispatch)(LoginPage);