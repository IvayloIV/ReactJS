import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Input from '../common/Input';
import { loginAction, registerAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPass: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { username, password, repeatPass } = this.state;
        
        if (username.length < 5) {
            toast.error('Username must be more than 4 symbols.');
            return;
        }

        if (password.length === 0) {
            toast.error('Password is empty.');
            return;
        }

        if (password !== repeatPass) {
            toast.error('Passwords must match.');
            return;
        }
        
        this.props.register(username, password)
            .then((json) => {
                if (json.error) {
                    toast.error(json.description);
                    return;
                }

                this.props.login(username, password, 'Register');
            });
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
            <section id="viewRegister">
                <div className="content">
                    <form className="form" id="formRegister" onSubmit={this.onSubmitHandler}>
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
                        <Input
                            name="repeatPass"
                            type="password"
                            value={this.state.repeatPass}
                            onChange={this.onChangeHandler}
                            label="Repeat Password"
                        />
                        <input id="btnRegister" value="Register" type="submit" />
                        <Link to="/login">Log in</Link>
                    </form>
                </div>
            </section>
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
        register: (username, password) => dispatch(registerAction(username, password)),
        login: (username, password, msg) => dispatch(loginAction(username, password, msg)),
        redirect: () => dispatch(redirect())
    };
}

export default withRouter(connect(mapState, mapDispatch)(RegisterPage));