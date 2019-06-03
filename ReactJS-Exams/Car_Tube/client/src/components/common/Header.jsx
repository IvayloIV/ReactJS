import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn, onLogout }) => {
    const username = sessionStorage.getItem('username');

    return (
        <nav>
            <Link className="active" to="/">Home</Link>
            {loggedIn && <Link to="/car/all">All Listings</Link>}
            {loggedIn && <Link to="/car/my">My Listings</Link>}
            {loggedIn && <Link to="/car/create">Create Listing</Link>}
            {loggedIn && <div id="profile">
                <a>Welcome, {username}</a>
                <a href="javascript:void(0)" onClick={onLogout}>logout</a>
            </div>}
        </nav>
    );
};

export default Header;