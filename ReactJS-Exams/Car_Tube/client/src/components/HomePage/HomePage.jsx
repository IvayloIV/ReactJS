import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Image from '../../images/finance-car.png';

const HomePage = () => {
    if (sessionStorage.getItem('authToken')) {
        return <Redirect to="/car/all" />
    }

    return (
        <div id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img src={Image} alt="carIntro" />
                <h2>Login or register to check out our listings or to make one</h2>
                <div id="button-div">
                    <Link to="/login" className="button">Login</Link>
                    <Link to="/register" className="button">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
