import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        return (
            <nav>
                <Link className="active" to="/">Home</Link>
                {loggedIn && <Link to="/meme/create">Create Meme</Link>}
                {loggedIn && <div id="profile">
                    <a href="javascript:void(0)">Welcome {username}</a>
                    <Link to={`/user/profile/${userId}`}>My Profile</Link>
                    <a onClick={onLogout}>logout</a>
                </div>}
            </nav>
        );
    }
}