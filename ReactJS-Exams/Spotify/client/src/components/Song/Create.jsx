import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSongAction } from '../../actions/songActions';
import Input from '../common/Input';
import { toast } from 'react-toastify';


class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            artist: '',
            imageUrl: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const  { title, artist, imageUrl } = this.state;
        if (title.length < 6) {
            toast.error('The title should be at least 6 characters long.');
            return;
        }

        if (artist.length < 3) {
            toast.error('The artist should be at least 3 characters long.');
            return;
        }

        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            toast.error('The image should start with "http://" or "https://".');
            return;
        }

        this.props.createSong(title, artist, imageUrl)
            .then(() => {
                this.props.history.push('/song/all');
            });
    }

    render() {
        return (
            <section id="createSongView">
            <div className="background-spotify">
                <div className="song-container">
                    <h1>Create new song</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <Input
                            name="title"
                            value={this.state.title}
                            onChange={this.onChangeHandler}
                            label="Title"
                        />
                        <Input
                            name="artist"
                            value={this.state.artist}
                            onChange={this.onChangeHandler}
                            label="Artist"
                        />
                        <Input
                            name="imageUrl"
                            value={this.state.imageUrl}
                            onChange={this.onChangeHandler}
                            label="ImageUrl"
                        />
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </section>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        createSong: (title, artist, imageURL) => dispatch(createSongAction(title, artist, imageURL))
    };
}

export default withRouter(connect(null, mapDispatch)(Create));
