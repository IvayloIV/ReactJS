import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Chirp(props) {
    const { id, text, author, date, removeChirpHandler } = props;
    const isOwner = localStorage.getItem('username') === author;

    return (
        <article className="chirp">
            <div className="titlebar">
                <Link to={`/feed/${author}`} className="chirp-author">{author}</Link>
                {isOwner && <a href="javascript:void(0)" onClick={() => {
                    removeChirpHandler(id).then(() => {
                        toast.success('Removed successful.');
                    });
                }}>delete</a>}
                <span className="chirp-time">{calcTime(date)}</span>
            </div>
            <p>{text}</p>
        </article>
    )
}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

export default Chirp;
