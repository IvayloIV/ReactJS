import React from 'react';
import {toast} from 'react-toastify';
import observer from '../../utils/observer';

const Comment = (props) => {
    let isOwner = localStorage.getItem('userId') === props.comment._acl.creator;
    let id = props.comment._id;
    return (
        <article className="post post-content">
            <p>{props.comment.content}</p>
            <div className="info">
                submitted {observer.calcTime(props.comment._kmd.ect)} ago by {props.comment.author} |
                    {isOwner ? <a href="#" onClick={(e) => {
                    observer.invokeFunc('deleteComment', { e, id });
                    toast.success('Comment deleted.');
                }} className="deleteLink"> delete</a> : null}
            </div>
        </article>
    );
}

export default Comment;