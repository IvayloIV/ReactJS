import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link className="navbar-brand" to="/">FS</Link>
                                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
                                {loggedIn && <NavLink to="/furniture/create" activeClassName="active">Create Furniture</NavLink>}
                                {loggedIn && <NavLink to="/furniture/mine" activeClassName="active">My Furniture</NavLink>}
                                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                <span>{this.props.furniture} items in catalog</span>
                                <br/>
                                <span>{this.props.users} users</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}