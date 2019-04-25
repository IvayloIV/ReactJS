import React from 'react'
import SongCard from './SongCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { likeSongAction, listenSongAction, removeSongAction } from '../../actions/songActions';

function SongList(props) {
    return (
        <React.Fragment>
            {props.songs.map(s => (
                <SongCard 
                    key={s._id}
                    song={s}
                    likeSong={props.likeSong}
                    listenSong={props.listenSong}
                    removeSong={props.removeSong}
                />
            ))}
        </React.Fragment>
    )
}

function mapDispatch(dispatch) {
    return {
        likeSong: (song) => dispatch(likeSongAction(song)),
        listenSong: (song) => dispatch(listenSongAction(song)),
        removeSong: (song) => dispatch(removeSongAction(song))
    };
}

export default withRouter(connect(null, mapDispatch)(SongList));
