import React from 'react';

class Image extends React.Component {
    render() {
        return (
            <div className="image-block" onClick={() => this.props.updEpisode()}>
                <img className="gallery" src={this.props.imageUrl} alt={this.props.imageAlt} />
            </div>
        )
    }
}

export default Image;