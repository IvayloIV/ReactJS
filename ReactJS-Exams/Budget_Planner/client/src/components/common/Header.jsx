import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {loggedIn && <NavLink to="/plan/2019/1" className="nav-link" activeClassName="active">Monthly Balance</NavLink>}
                                {loggedIn && <NavLink to="/" className="nav-link" activeClassName="active">Yearly Balance</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" className="nav-link" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}