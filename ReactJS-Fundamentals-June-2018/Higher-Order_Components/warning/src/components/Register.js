import React from 'react';
import WithWarning from './WithWarning';
import BoundFrom from './BoundForm';

function registerUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Created');
        }, 2000);
    });
}

class RegisterBase extends React.Component {
    onSubmitted = (state) => {
        console.log(state);
        registerUser().then((message) => console.log(message));
    }

    render() {
        return (
            <div>
                <header><span className="title">Register</span></header>
                <BoundFrom onSubmit={this.onSubmitted}>
                    Username:
                        <input type="text" name="username" /><br />
                    Email:
                        <input type="text" name="email" /><br />
                    Password:
                        <input type="password" name="password" /><br />
                    Repeat Password:
                        <input type="password" name="repeatPassword" /><br />
                    <input type="submit" value="Register" />
                </BoundFrom>
            </div>
        );
    }
}

const Register = WithWarning(RegisterBase);

export default Register;