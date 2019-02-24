import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <React.Fragment>
                <header><span>Chirper</span></header>
                {loggedIn && <div className="menu">
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    <NavLink to="/discover" activeClassName="active">Discover</NavLink>
                    <NavLink to="/feed/my" activeClassName="active">Me</NavLink>
                    <a href="javascript:void(0)" onClick={onLogout}>Logout</a>
                </div>}
            </React.Fragment>
        );
    }
}