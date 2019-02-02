import React from 'react';

class Bio extends React.Component {
    render() {
        let episode = this.props.episode;
        return (
            <div className="Bio-episode">
                <p>
                    <img src={episode.url} alt={episode.name}/>
                    <span>{episode.name}</span>
                </p>
                <p>{episode.bio}</p>
            </div>
        )
    }
}

export default Bio;