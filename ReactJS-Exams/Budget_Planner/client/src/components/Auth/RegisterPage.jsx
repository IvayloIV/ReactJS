import React, { Component } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { loginAction, registerAction, redirect } from '../../actions/authActions';
import registerValidator from "../../validations/register";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: '',
            buttonClicked: false 
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, email, password, repeat } = this.state;
        const validations = registerValidator(username, email, password, repeat);

        if (validations['name'] !== '' || validations['email'] !== '' || 
            validations['password'] !== '' || validations['repeat'] !== '') {
            toastr.error('Check your errors.');
            return;
        }

        this.setState({buttonClicked: true});
        this.props.register(this.state.username, this.state.email, this.state.password).then(json => {
            if (json.success) {
                toastr.success('Register successful.');
            } else {
                toastr.error(json.message);
            }
            this.setState({buttonClicked: false});
        });
    }

    componentDidMount() {
        if (localStorage.getItem('authToken')) {
            toastr.warning('You have already log in.');
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
        const { username, email, password, repeat, buttonClicked } = this.state;
        const validations = registerValidator(username, email, password, repeat);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Register</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row">
                        <div className="col-md-3">
                            <Input
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeHandler}
                                label="Username"
                                validation={validations['name']}
                            />
                            <Input
                                name="email"
                                value={this.state.email}
                                onChange={this.onChangeHandler}
                                label="Email"
                                validation={validations['email']}
                            />
                            <Input
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeHandler}
                                label="Password"
                                type="password"
                                validation={validations['password']}
                            />
                            <Input
                                name="repeat"
                                value={this.state.repeat}
                                onChange={this.onChangeHandler}
                                label="Repeat"
                                type="password"
                                validation={validations['repeat']}
                            />
                            <input type="submit" className="btn btn-secondary" value="Register" disabled={buttonClicked} />
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

export default connect(mapState, mapDispatch)(RegisterPage);