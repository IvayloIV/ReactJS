import React from 'react';
import { toast } from 'react-toastify';
import observer from '../../utils/observer';
import history from '../../history';

const Header = (props) => {
    return (
        <header>
            <span className="logo">☃</span><span className="header">SeenIt</span>
            {props.user.username ? <div id="profile"><span>{props.user.username}</span>|
            <a href="#" onClick={() => {
                observer.invokeFunc('removeUserData');
                history.push('/');
                toast.success('Logout successful.');
            }}>logout</a></div> : null}
        </header>
    );
};

export default Header;