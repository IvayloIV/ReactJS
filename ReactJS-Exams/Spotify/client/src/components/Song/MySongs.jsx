import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mySongsAction } from '../../actions/songActions';
import SongList from './SongList';

class MySongs extends Component {
    componentDidMount() {
        this.props.getMySongs();
    }

    render() {
        const songs = this.props.mySongs.sort((a, b) => {
            if (a['likes'] !== b['likes']) {
                return b['likes'] - a['likes'];
            }
            
            return b['listened'] - a['listened'];
        });

        return (
            <section id="mySongsView">
                <div className="background-spotify">
                    <div className="song-container">
                        <h1>My Songs</h1>
                        <SongList songs={songs} />
                    </div>
                </div>
            </section>
        )
    }
}

function mapState(state) {
    return {
        mySongs: state.songs
    };
}

function mapDispatch(dispatch) {
    return {
        getMySongs: () => dispatch(mySongsAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(MySongs));
