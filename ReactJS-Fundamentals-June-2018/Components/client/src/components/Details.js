import React from 'react';
import Bio from './Bio';

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            episode: {}
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/character/' + this.props.focusedEp)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({episode: parsedData});
            });
    }

    componentWillReceiveProps(nextProps) {
        let fcEp = Number(nextProps.focusedEp);
        fetch('http://localhost:5000/character/' + fcEp)
            .then(data => {
                return data.json();
            })
            .then(parsedData => {
                this.setState({episode: parsedData});
            });
    }


    render() {
        return (
            <div>
                <Bio episode={this.state.episode} />
            </div>
        );
    }
}

export default Details;
