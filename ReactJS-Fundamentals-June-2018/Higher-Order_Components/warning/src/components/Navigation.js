import React from 'react';
import WithWarning from './WithWarning';

const NavigationBase = (props) => {
    return (
        <nav>
            <header><span className="title">Navigation</span></header>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="#">Catalog</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </nav>
    );
}

const Navigation = WithWarning(NavigationBase);

export default Navigation;
