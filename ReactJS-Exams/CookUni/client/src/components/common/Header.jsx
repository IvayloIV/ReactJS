import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');

        return (
            <header className="masthead mb-auto">
                <div className="inner">
                    <h3 className="masthead-brand">CookUni</h3>
                    <nav className="nav nav-masthead justify-content-center">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        {loggedIn && <NavLink className="nav-link" to="#">Welcome, {username}!</NavLink>}
                        {loggedIn && <NavLink className="nav-link" to="/recipe/create">Share recipe</NavLink>}
                        {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                        {!loggedIn && <NavLink className="nav-link" to="/login">Login</NavLink>}
                        {!loggedIn && <NavLink className="nav-link" to="/register">Register</NavLink>}
                    </nav>
                </div>
            </header>
        );
    }
}