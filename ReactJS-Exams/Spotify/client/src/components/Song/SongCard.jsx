import React, { Component } from 'react';

export class SongCard extends Component {
    render() {
        const userId = sessionStorage.getItem('userId');
        const s = this.props.song;

        return (
            <div className="song">
                <h5>Title: {s.title}</h5>
                <h5>Artist: {s.artist}</h5>
                <img className="cover" src={s.imageUrl} alt="image-song"/>
                {s._acl.creator === userId ?
                    <div>
                        <p>Likes: {s.likes}; Listened {s.listened} times</p>
                        <a href="javascript:void(0)" onClick={() => this.props.removeSong(s._id)}><button type="button" className="btn btn-danger mt-4">Remove</button></a>
                        <a href="javascript:void(0)" onClick={() => this.props.listenSong(s)}><button type="button" className="btn btn-success mt-4">Listen</button></a>
                    </div> :
                    <div>
                        <p>Likes: {s.likes}</p>
                        <a href="javascript:void(0)" onClick={() => this.props.likeSong(s)}><button type="button" className="btn btn-primary mt-4">Like</button></a>
                    </div>
                }
            </div>
        )
    }
}

export default SongCard;
