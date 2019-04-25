import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');

        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="collapse navbar-collapse" id="navbarText">
                    {loggedIn && <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/song/all" activeClassName="active" className="nav-link">All Songs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/song/my" activeClassName="active" className="nav-link">My Songs</NavLink>
                        </li>
                    </ul>}
                    {loggedIn && <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)">Welcome, {username}!</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>
                        </li>
                    </ul> }
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    {!loggedIn && <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                        </li>
                    </ul>}
                </div>
            </nav>
        );
    }
}