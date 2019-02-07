import React from 'react';

import Post from './Post';
import CommentFrom from './CommentForm';
import Comment from './Comment';
import Menu from '../posts/Menu';

import observer from '../../utils/observer';
import api from '../../utils/api';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            comments: []
        }

        observer.addFunc('updateComments', this.updateComments);
        observer.addFunc('deleteComment', this.deleteComment);
    }

    updateComments = () => {
        const idPost = this.props.match.params.id;
        api.getComments(idPost)
            .then(d => d.json())
            .then(parsedData => {
                this.setState({
                    comments: parsedData
                });
            });
    }

    deleteComment = (params) => {
        let { id } = params;

        api.deleteComment(id).then(() => {
            this.updateComments();
        });
    }

    async componentDidMount() {
        const idPost = this.props.match.params.id;
        
        let post = await api.detailsPost(idPost);
        const parsedPost = await post.json();

        let comments = await api.getComments(idPost);
        const parsedComments = await comments.json();

        this.setState({
            post: parsedPost,
            comments: parsedComments
        });
    }

    render() {
        return (
            <section id="viewComments">
                <Menu />
                <Post data={this.state.post} />
                <div className="post post-content">
                    <CommentFrom data={this.state.post} />
                </div>
                {this.state.comments.map((c, i) => {
                    return (
                        <Comment key={i} comment={c} />
                    );
                })}
            </section>
        )
    }
}

export default Details;