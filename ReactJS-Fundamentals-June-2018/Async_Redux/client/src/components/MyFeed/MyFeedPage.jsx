import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { myFeedAction, createChirpAction, removeChirpAction } from '../../actions/chirpActions';
import  {} from '../../api/remote';

import CreateChirp from '../common/CreateChirp';
import Chirp from '../common/Chirp';
import { toast } from 'react-toastify';

class MyFeedPage extends Component {
    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/');
            return;
        }
        
        this.props.getChirp(localStorage.getItem('username'));
    }

    render() {
        const { chirps, chirpsCount, followersCount, followingCount } = this.props.chirps;
        return (
            <section id="viewMe">
                <div className="content">
                    <CreateChirp 
                        chirpsCount={chirpsCount}
                        followersCount={followersCount}
                        followingCount={followingCount}
                        createChirpHandler={this.props.createChirp}
                    />
                    <div id="myChirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                        {chirps.length === 0 ? 
                            <p>No chirps in database</p> :
                            chirps.map(c => <Chirp
                                key={c._id}
                                id={c._id}
                                text={c.text}
                                author={c.author}
                                date={c._kmd.ect}
                                removeChirpHandler={this.props.removeChirp}
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
        createChirp: (data) => dispatch(createChirpAction(data, true)),
        removeChirp: (id) => dispatch(removeChirpAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(MyFeedPage));