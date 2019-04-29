import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');

        return (
            <nav className="site-header sticky-top py-1">
                <div className="container d-flex flex-column flex-md-row justify-content-between">
                    <NavLink className="py-2" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mx-auto" role="img"
                            viewBox="0 0 24 24" focusable="false">
                            <title>UniEnt Home</title>
                            <circle cx="12" cy="12" r="10"></circle>
                            <path
                                d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94">
                            </path>
                        </svg>
                    </NavLink>
                    {loggedIn && <NavLink className="py-2 d-none d-md-inline-block" to="/event/create">Organize Event</NavLink>}
                    {loggedIn && <NavLink className="py-2 d-none d-md-inline-block" to="/event/my">{username}</NavLink>}
                    {loggedIn && <a className="py-2 d-none d-md-inline-block" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                    {!loggedIn && <NavLink className="py-2 d-none d-md-inline-block" to="/login">Login</NavLink>}
                </div>
            </nav>
        );
    }
}