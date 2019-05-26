import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { createMemeAction } from '../../actions/memeActions';

class CreateMeme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
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
        const { title, description, imageUrl } = this.state;
        const creator = sessionStorage.getItem('username');

        if (title.length > 33) {
            toast.error('The title length must not exceed 33 characters!');
            return;
        }

        if (description.length < 30 || description.length > 450) {
            toast.error('The description length must not exceed 450 characters and should be at least 30!');
            return;
        }

        if (!imageUrl.startsWith('http')) {
            toast.error('Link url should always start with "http".');
            return;
        }

        this.props.createMeme(creator, title, description, imageUrl)
            .then((json) => {
                if (!json.error) {
                    this.props.history.push('/meme/all');
                }
            });
    }

    render() {
        return (
            <div id="create-meme">
                <form onSubmit={this.onSubmitHandler}>
                    <div className="container">
                        <h1>Create Meme</h1>
                        <p>Please fill in this form to create an meme.</p>

                        <Input
                            name="title"
                            value={this.state.title}
                            onChange={this.onChangeHandler}
                            label="Title"
                        />

                        <Input
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                            label="Description"
                        />

                        <Input
                            name="imageUrl"
                            value={this.state.imageUrl}
                            onChange={this.onChangeHandler}
                            label="Meme Image"
                        />

                        <button type="submit" className="registerbtn">Create Meme</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        createMeme: (creator, title, description, imageUrl) => dispatch(createMemeAction(creator, title, description, imageUrl))
    };
}

export default withRouter(connect(null, mapDispatch)(CreateMeme));