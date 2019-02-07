import React from 'react';
import { Link } from 'react-router-dom';
import observer from '../../utils/observer';

const Post = (props) => {
    if (!props.data._acl) {
        return null;
    }

    let isOwner = localStorage.getItem('userId') === props.data._acl.creator;
    let id = props.data._id;

    return (
        <div className="post">
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
                    <p>{props.data.description}</p>
                    <div className="info">
                        submitted {observer.calcTime(props.data._kmd.ect)} ago by {props.author}
                    </div>
                    {isOwner ?
                        <div className="controls">
                            <ul>
                                <li className="action"><Link className="editLink" to={'/article/edit/' + id}>edit</Link></li>
                                <li className="action"><Link className="deleteLink" to={'/article/delete/' + id}>delete</Link></li>
                            </ul>
                        </div> : null
                    }
                </div>
            </div>
            <div className="clear"></div>
        </div>
    )
}

export default Post;