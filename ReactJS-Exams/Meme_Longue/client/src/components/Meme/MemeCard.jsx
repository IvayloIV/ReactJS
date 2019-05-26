import React from 'react';
import { Link } from 'react-router-dom';

function MemeCard(props) {
    const { _id, title, creator, imageUrl } = props.meme;
    const creatorId = props.meme._acl.creator;
    const isOwner = sessionStorage.getItem('userId') === props.meme._acl.creator;
    const { removeMemeHandler } = props;

    return (
        <div className="meme">
            <Link to={`/meme/details/${_id}`} className="meme-title">{title}</Link>
            <br />
            <Link to={`/meme/details/${_id}`}><img className="meme-image" src={imageUrl} /></Link>
            <div className="info">

                <div id="data-buttons">
                    <Link to={`/meme/details/${_id}`} className="custom-button">Check Out</Link>
                    {isOwner && <Link to={`/meme/edit/${_id}`} className="custom-button">Edit</Link>}
                    {isOwner && <a href="javascript:void(0)" className="custom-button" onClick={removeMemeHandler}>Delete</a>}
                    <Link to={`/user/profile/${creatorId}`} className="creator">Creator: {creator}</Link>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default MemeCard;
