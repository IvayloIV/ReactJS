import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getChirpAction, createChirpAction } from '../../actions/chirpActions';

import CreateChirp from '../common/CreateChirp';
import Chirp from '../common/Chirp';

class HomePage extends Component {
    componentDidMount() {
        this.props.getChirp();
    }

    render() {
        const { chirps, chirpsCount, followersCount, followingCount } = this.props.chirps;
        return (
            <section id="viewFeed">
                <div className="content">
                    <CreateChirp 
                        chirpsCount={chirpsCount}
                        followersCount={followersCount}
                        followingCount={followingCount}
                        createChirpHandler={(data) => {
                            this.props.history.push('/feed/my');
                            this.props.createChirp(data);
                        }}
                    />
                    <div id="chirps" className="chirps"><h2 className="titlebar">Chirps</h2>
                        {chirps.length === 0 ? 
                            <p>No chirps in database</p> :
                            chirps.map(c => <Chirp
                                key={c._id}
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
        getChirp: () => dispatch(getChirpAction()),
        createChirp: (data) => dispatch(createChirpAction(data)),
    };
}

export default withRouter(connect(mapState, mapDispatch)(HomePage));