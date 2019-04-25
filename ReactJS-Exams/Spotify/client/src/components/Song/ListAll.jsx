import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllSongsAction } from '../../actions/songActions';
import SongList from './SongList';

class ListAll extends Component {
    componentDidMount() {
        this.props.getAllSongs();
    }

    render() {
        const data = this.props.songs;
        const userId = sessionStorage.getItem('userId');
        const otherSongs = data.filter(a => a._acl.creator !== userId).sort((a, b) => b['likes'] - a['likes']);
        const mySongs = data.filter(a => a._acl.creator === userId).sort((a, b) => {
            if (a['likes'] !== b['likes']) {
                return b['likes'] - a['likes'];
            }
            
            return b['listened'] - a['listened'];
        });

        return (
            <section id="allSongsView">
                <div className="background-spotify">
                    <div className="song-container">
                        <h1>All Songs</h1>
                        <Link to="/song/create">
                            <button type="button" className="btn-lg btn-block new-song-btn">Add a new song</button>
                        </Link>
                        <SongList songs={otherSongs}/>
                        <SongList songs={mySongs}/>
                    </div>
                </div>
            </section>
        )
    }
}

function mapState(state) {
    return {
        songs: state.songs
    };
}

function mapDispatch(dispatch) {
    return {
        getAllSongs: () => dispatch(getAllSongsAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(ListAll));
