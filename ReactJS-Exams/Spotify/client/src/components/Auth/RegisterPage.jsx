import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Input from '../common/Input';
import { registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
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
        if (username.length < 3) {
            toast.error('Username must be at least 3 symbols.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 symbols.');
            return;
        }

        this.props.register(username, password)
            .then(() => {});
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
            <section id="registerView">
            <div className="background-spotify">
                <div className="song-container">
                    <h1>Register</h1>
                    <form onSubmit={this.onSubmitHandler}>
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
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <h4 className="mt-3 text-white">Already have an account? <NavLink to="/login" className="add-link">Login</NavLink></h4>
                </div>
            </div>
            </section>
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