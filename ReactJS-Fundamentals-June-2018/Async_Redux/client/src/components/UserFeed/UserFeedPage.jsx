import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { myFeedAction } from '../../actions/chirpActions';
import { followAction, unFollowAction } from '../../actions/userActions';
import Chirp from '../common/Chirp';
import { toast } from 'react-toastify';

class UserFeedPage extends Component {
    componentDidMount() {
        if (localStorage.getItem('authToken')) {
            this.props.getChirp(this.props.match.params.username);
        } else {
            this.props.history.push('/');
            toast.error('First you must login.');
        }
    }

    render() {
        if (!localStorage.getItem('authToken')) {
            return null;
        }

        const { chirps, chirpsCount, followersCount, followingCount } = this.props.chirps;
        const username = this.props.match.params.username;
        const isFollowed = JSON.parse(localStorage.getItem('subs')).indexOf(username) > -1;

        return (
            <section id="viewProfile">
                <div className="content">
                    <div className="chirper">
                        <h2 className="titlebar">{username}</h2>
                        {isFollowed ?
                            <a id="btnFollow" className="chirp-author" href="javascript:void(0)" onClick={() => {
                                this.props.unfollow(username)
                                    .then(() => {
                                        toast.success(`Unsubscribed to ${username}`);
                                    });
                            }}>Unfollow</a> :
                            <a id="btnFollow" className="chirp-author" href="javascript:void(0)" onClick={() => {
                                this.props.follow(username)
                                    .then(() => {
                                        toast.success(`Subscribed to ${username}`);
                                    });
                            }}>Follow</a>
                        }
                        <div id="userProfileStats" className="user-details">
                            <span>{chirpsCount} chirps</span> | <span>{followingCount} following</span> | <span>{followersCount} followers</span>
                        </div>
                    </div>
                    <div id="profileChirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                        {chirps.length === 0 ?
                            <p>No chirps in database</p> :
                            chirps.map(c => <Chirp
                                key={c._id}
                                id={c._id}
                                text={c.text}
                                author={c.author}
                                date={c._kmd.ect}
                            />)
                        }
                    </div>
                </div>
            </section>
        );
    }
}

function mapState(state) {
    return {
        chirps: state.chirps
    };
}

function mapDispatch(dispatch) {
    return {
        getChirp: (username) => dispatch(myFeedAction(username)),
        follow: (username) => dispatch(followAction(username)),
        unfollow: (username) => dispatch(unFollowAction(username))
    };
}

export default withRouter(connect(mapState, mapDispatch)(UserFeedPage));