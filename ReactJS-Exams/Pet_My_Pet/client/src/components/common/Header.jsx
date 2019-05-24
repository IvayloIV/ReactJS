import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        const username = sessionStorage.getItem('username');
        
        return (
            <header id="site-header">
                <nav className="navbar">
                    {loggedIn && <section className="navbar-dashboard">
                        <div className="first-bar">
                            <Link to="/pet/all">Dashboard</Link>
                            <Link className="button" to="/pet/my">My Pets</Link>
                            <Link className="button" to="/pet/create">Add Pet</Link>
                        </div>
                        <div className="second-bar">
                            <ul>
                                <li>Welcome, {username}!</li>
                                <li><a href="javascript:void(0)" onClick={onLogout}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                            </ul>
                        </div>
                    </section>}
                    {!loggedIn && <section className="navbar-anonymous">
                        <ul>
                            <li><Link to="/register"><i className="fas fa-user-plus"></i> Register</Link></li>
                            <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                        </ul>
                    </section>}
                </nav>
            </header>
        );
    }
}