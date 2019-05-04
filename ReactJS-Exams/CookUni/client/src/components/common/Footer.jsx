import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="mastfoot mt-5 text-center text-light">
            <div className="inner">
                <p>Made with &hearts; by <Link to="/">CookUni</Link>.</p>
            </div>
            <i className="fa fa-heart"></i>
        </footer>
    )
}

export default Footer;
