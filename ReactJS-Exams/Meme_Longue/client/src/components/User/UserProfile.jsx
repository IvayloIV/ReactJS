import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserMeme from './UserMeme';
import { getUserMemesAction, removeMemeAction } from '../../actions/memeActions';
import { getUserProfileAction, removeUserAction } from '../../actions/userActions';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: ''
        };
    }

    componentDidMount() {
        this.updateData();
    }

    updateData() {
        const userId = this.state.id;

        this.props.getProfile(userId).then((user) => {
            this.props.getUserMemes(user.username).then(() => {
                this.setState({ loading: false, id: userId });
            });
        });
    }

    static getDerivedStateFromProps(props, state) {
        const userId = props.match.params['id'];

        if (state.id !== userId) {
            props.getProfile(userId).then((user) => {
                props.getUserMemes(user.username);
            });
            return { id: userId };
        }

        return null;
    }

    removeMemeHandler(id) {
        this.props.removeMeme(id);
    }

    removeUserHandler(userId) {
        this.props.removeUser(userId).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const { user, memes } = this.props;
        const userId = sessionStorage.getItem('userId');
        const isOwner = userId === user._id;
        return (
            <div className="user-profile">

                <img id="user-avatar-url" src={user.avatarUrl} />
                <h1>{user.username}</h1>
                <h2>{user.email}</h2>

                {isOwner && <a id="deleteUserButton" href="javascript:void(0)" onClick={this.removeUserHandler.bind(this, userId)}>DELETE USER!</a>}

                <p id="user-listings-title">User Memes
            </p>
                <div className="user-meme-listings">
                    {memes.map(m => (
                        <UserMeme 
                            meme={m} 
                            key={m._id} 
                            isOwner={isOwner} 
                            removeMemeHandler={this.removeMemeHandler.bind(this, m._id)}
                        />
                    ))}
                    {memes.length === 0 && <p className="no-memes">No memes in database.</p>}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        user: state.user,
        memes: state.memes
    };
}

function mapDispatch(dispatch) {
    return {
        getUserMemes: (username) => dispatch(getUserMemesAction(username)),
        getProfile: (id) => dispatch(getUserProfileAction(id)),
        removeUser: (id) => dispatch(removeUserAction(id)),
        removeMeme: (id) => dispatch(removeMemeAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(UserProfile));