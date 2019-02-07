import React from 'react';
import {toast} from 'react-toastify';
import observer from '../../utils/observer';
import api from '../../utils/api';

class CommentFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    onChanged = (event) => {
        this.setState({ content: event.target.value });
    }

    onSubmitted = (event) => {
        event.preventDefault();
        const payload = {
            author: localStorage.getItem('username'),
            postId: this.props.data._id,
            content: this.state.content
        };

        if (this.content === '') {
            toast.error('Empty content!');
            return;
        }

        api.createComment(payload)
            .then(d => d.json())
            .then(() => {
                this.setState({ content: '' });
                observer.invokeFunc('updateComments');
                toast.success('Comment created.');
            });
    }

    render() {
        return (
            <form id="commentForm" onSubmit={this.onSubmitted}>
                <label>Comment</label>
                <textarea className="content" type="text" value={this.state.content} onChange={this.onChanged} />
                <input type="submit" defaultValue="Add Comment" id="btnPostComment" />
            </form>
        );
    }
}

export default CommentFrom;