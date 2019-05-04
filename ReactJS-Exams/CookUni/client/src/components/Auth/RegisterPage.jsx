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
            password: '',
            repeatPass: '',
            firstName: '',
            lastName: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, password, firstName, lastName, repeatPass } = this.state;
        
        if (firstName.length < 2) {
            toast.error('First name should be at least 2 symbols.');
            return;
        }

        if (lastName.length < 2) {
            toast.error('Last name should be at least 2 symbols.');
            return;
        }

        if (username.length < 3) {
            toast.error('Username should be at least 3 symbols.');
            return;
        }

        if (password.length < 6) {
            toast.error('The password should be at least 6 characters long.');
            return;
        }

        if (password !== repeatPass) {
            toast.error('The repeat password should be equal to the password.');
            return;
        }

        this.props.register(username, password, firstName, lastName);
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
            <form className="text-center p-5 form-layout" onSubmit={this.onSubmitHandler}>
                <p className="h4 mb-4">Sign up</p>
                <div className="form-row mb-4">
                    <div className="col">
                        <Input
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.onChangeHandler}
                            label="First name"
                        />
                    </div>
                    <div className="col">
                        <Input
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.onChangeHandler}
                            label="Last name"
                        />
                    </div>
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
                <hr />
                <Input
                    name="repeatPass"
                    type="password"
                    value={this.state.repeatPass}
                    onChange={this.onChangeHandler}
                    label="Repeat password"
                />
                <button className="btn btn-danger my-4 btn-block w-25 m-auto" type="submit">Sign up</button>
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
        register: (username, password, firstName, lastName) => dispatch(registerAction(username, password, firstName, lastName)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));