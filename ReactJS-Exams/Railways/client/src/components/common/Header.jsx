import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/img/cart.png';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <nav className="nav-register">
                <div className="left-container">
                    <ul>
                        <li><Link to="/">Trains</Link></li>
                        {loggedIn && <li><Link to="/ticket/my">My Tickets</Link></li>}
                        {!loggedIn && <li><Link to="/login">Login</Link></li>}
                        {!loggedIn && <li><Link to="/register">Register</Link></li>}
                    </ul>
                </div>
                {loggedIn && 
                    <div className="right-container">
                        <span>Welcome, {localStorage.getItem('user')} |</span>
                        <li><a href="javascript:void(0)" onClick={onLogout}>Logout</a></li>
                        <Link to="/cart"><img src={logo} alt="cart" className="cart" /></Link>
                    </div>
                }
            </nav>
        );
    }
}