import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemeCard from './MemeCard';
import { getAllMemesAction, removeMemeAction } from '../../actions/memeActions';

class ListMemes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.props.loadMemes().then(() => {
            this.setState({ loading: false });
        });
    }

    removeMemeHandler(id) {
        this.props.removeMeme(id);
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const memes = this.props.memes;
        return (
            <div id="meme-feed">
                <h1>Meme Feed</h1>
                <div id="memes">
                    {memes.map(m => <MemeCard meme={m} key={m._id} removeMemeHandler={this.removeMemeHandler.bind(this, m._id)}/>)}
                    {memes.length === 0 && <p className="no-memes">No memes in database.</p>}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        memes: state.memes
    };
}

function mapDispatch(dispatch) {
    return {
        loadMemes: () => dispatch(getAllMemesAction()),
        removeMeme: (id) => dispatch(removeMemeAction(id))
    };
}

export default connect(mapState, mapDispatch)(ListMemes);