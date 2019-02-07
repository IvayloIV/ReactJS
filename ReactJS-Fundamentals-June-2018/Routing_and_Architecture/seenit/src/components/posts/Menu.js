import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <div id="menu">
            <div className="title">Navigation</div>
            <NavLink className="nav" to="/catalog">Catalog</NavLink>
            <NavLink className="nav" to="/article/create">Submit Link</NavLink>
            <NavLink className="nav" to="/article/my">My Posts</NavLink>
        </div>
    );
};

export default Menu;