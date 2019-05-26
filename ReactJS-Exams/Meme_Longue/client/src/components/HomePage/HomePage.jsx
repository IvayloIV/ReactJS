import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        const authToken = sessionStorage.getItem('authToken');
        if (authToken) {
            return <Redirect to="/meme/all"/>
        }

        return (
            <div id="main">
                <div id="welcome-container">
                    <h1>Welcome To Meme Lounge</h1>
                    <img src="https://i.kym-cdn.com/photos/images/original/001/218/908/247.gif" alt="carIntro" />
                    <h2>Login to see our memes right away!</h2>
                    <div id="button-div">
                        <Link to="/login" className="button">Login</Link>
                        <Link to="/register" className="button">Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}
