import React from 'react';
import { Link } from 'react-router-dom';

function UserMeme(props) {
    const { title, imageUrl, _id } = props.meme;
    const { isOwner, removeMemeHandler } = props;

    return (
        <div className="user-meme">
            <Link to={`/meme/details/${_id}`} className="user-meme-title">{title}</Link>
            <Link to={`/meme/details/${_id}`}> <img className="userProfileImage" src={imageUrl} /></Link>

            <div className="user-memes-buttons">

                {isOwner && <Link to={`/meme/edit/${_id}`} className="user-meme-btn">Edit</Link>}
                {isOwner && <a href="javascript:void(0)" className="user-meme-btn" onClick={removeMemeHandler}>Delete</a>}

            </div>
        </div>
    )
}

export default UserMeme;
