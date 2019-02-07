import React from 'react';
import {toast} from 'react-toastify';
import { NavLink } from 'react-router-dom';

import observer from '../../utils/observer';
import api from '../../utils/api';

const Post = (props) => {
    let isOwner = localStorage.getItem('userId') === props.data._acl.creator;
    let id = props.data._id;
    return (
        <article className="post">
            <div className="col rank">
                <span>{props.data.index}</span>
            </div>
            <div className="col thumbnail">
                <a href={props.data.url}>
                    <img src={props.data.imageUrl} />
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={props.data.url}>
                        {props.data.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted {observer.calcTime(props.data._kmd.ect)} ago by {props.data.author}
                    </div>
                    <div className="controls">
                        <ul>
                            <li className="action"><NavLink className="commentsLink" to={'/comment/details/' + id}>comments</NavLink></li>
                            {isOwner ?
                                <span>
                                    <li className="action"><NavLink className="editLink" to={'/article/edit/' + id}>edit</NavLink></li>
                                    <li className="action"><a className="deleteLink" href="#" onClick={() => {
                                        api.deletePost(id).then(() => {
                                            observer.invokeFunc('updateCatalog');
                                            toast.success('Post deleted.');
                                        });
                                    }} >delete</a></li>
                                </span> : null
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </article>
    );
}

export default Post;