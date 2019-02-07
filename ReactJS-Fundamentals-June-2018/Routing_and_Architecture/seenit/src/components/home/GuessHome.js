import React from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from '../common/About';

const GuessHome = () => {
    return (
        <section id="viewWelcome">
            <div className="welcome">
                <div className="signup">
                    <Login />
                    <Register />
                </div>

                <About />
            </div>
        </section>
    );
};

export default GuessHome;