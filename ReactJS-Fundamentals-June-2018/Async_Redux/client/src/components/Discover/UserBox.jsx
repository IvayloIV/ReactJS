import React from 'react';
import { Link } from 'react-router-dom';

function UserBox(props) {
    const { username, followers } = props;
    return (
        <div className="userbox">
            <div><Link to={`/feed/${username}`} className="chirp-author">{username}</Link></div>

            <div className="user-details">
                <span>{followers} followers</span>
            </div>
        </div>
    )
}

export default UserBox;
