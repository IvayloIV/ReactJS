import React, { Component } from 'react';
import { toast } from 'react-toastify'

export class CreateChirp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const {text} = this.state;

        if (text.length === 0) {
            toast.error('Empty field.');
            return;
        }

        if (text.length > 150) {
            toast.error('Max length is 150 symbols.');
            return;
        }

        this.props.createChirpHandler({
            text: this.state.text,
            author: localStorage.getItem('username')
        });
        this.setState({ text: '' });
        toast.success('Create successful');
    }

    render() {
        const username = localStorage.getItem('username');
        const { chirpsCount, followersCount, followingCount } = this.props;
        return (
            <div className="chirper">
                <h2 className="titlebar">{username}</h2>

                <form id="formSubmitChirp" className="chirp-form" onSubmit={this.onSubmitHandler}>
                    <textarea name="text" value={this.state.text} className="chirp-input" onChange={this.onChangeHandler}/>
                    <input className="chirp-submit" id="btnSubmitChirp" defaultValue="Chirp" type="submit" />
                </form>

                <div id="userStats" className="user-details">
                    <span>{chirpsCount} chirps</span> | <span>{followingCount} following</span> | <span>{followersCount} followers</span>
                </div>
            </div>
        )
    }
}

export default CreateChirp;
