import React from 'react';
import Image from './Image';

class Characters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/roster')
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({images: parsedData});
            });
    }


    render() {
        return (
            <div className="characters">
                {this.state.images.map(a => {
                    return <Image key={a.id} imageUrl={a.url} imageAlt={a.name} 
                    updEpisode={() => this.props.updateEpisode(a.id)}/>
                })}
            </div>
        );
    }
}

export default Characters;