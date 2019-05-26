import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { detailsMemeAction, removeMemeAction } from '../../actions/memeActions';

class MemeDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params['id'];
        this.props.getDetailsMeme(id).then((json) => {
            if (!json.error) {
                this.setState({ loading: false });
            }
        });
    }

    removeMemeHandler(id) {
        this.props.removeMeme(id).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        if (this.state.loading || this.props.memes.length === 0) {
            return null;
        }

        const meme = this.props.memes[0];
        const isOwner = meme._acl.creator === sessionStorage.getItem('userId');
        return (
            <div className="meme-details">
                <div className="my-meme-details">
                    <a href="javascript:void(0)" id="meme-title">{meme.title}</a>
                    <img src={meme.imageUrl} />
                    <div className="meme-props">
                        <h2>Description</h2>
                        <p className="meme-description">{meme.description}</p>
                    </div>
                    <div className="meme-details-buttons">
                        <Link className="meme-details-button" to={`/user/profile/${meme._acl.creator}`}>Created by {meme.creator}</Link>
                        {isOwner && <Link to={`/meme/edit/${meme._id}`} className="meme-details-button">Edit</Link>}
                        {isOwner && <a href="javascript:void(0)" className="meme-details-button" onClick={this.removeMemeHandler.bind(this, meme._id)}>Delete</a>}
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        memes: state.memes
    };
}

function mapDispatch(dispatch) {
    return {
        getDetailsMeme: (id) => dispatch(detailsMemeAction(id)),
        removeMeme: (id) => dispatch(removeMemeAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(MemeDetails));