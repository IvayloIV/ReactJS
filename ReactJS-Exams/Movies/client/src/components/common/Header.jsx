import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');

        return (
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                {loggedIn && <li><Link to="/movie/all">Cinema</Link></li>}
                {loggedIn && <li><Link to="/movie/create">Add Movie</Link></li>}
                {loggedIn && <li><Link to="/movie/my">My Movies</Link></li>}
                {loggedIn && <li className="right"><a href="javascript:void(0)" onClick={onLogout}>Logout</a></li>}
                {loggedIn && <li className="right">Welcome, {username}!</li>}
                {!loggedIn && <li className="right"><Link to="/register">Register</Link></li>}
                {!loggedIn && <li className="right"><Link to="/login">Login</Link></li>}
                </ul>
            </nav>
        );
    }
}