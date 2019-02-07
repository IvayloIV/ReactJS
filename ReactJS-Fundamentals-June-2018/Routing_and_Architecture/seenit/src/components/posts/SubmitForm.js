import React from 'react';
import {toast} from 'react-toastify';
import history from '../../history';
import Menu from './Menu';
import api from '../../utils/api';

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            url: '',
            imageUrl: ''
        };
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitted = (event) => {
        event.preventDefault();
        const payload = {
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            imageUrl: this.state.imageUrl,
            author: localStorage.getItem('username')
        };

        if (!payload.url.startsWith('http')) {
            toast.error('Url must start with http!');
            return;
        }

        if (payload.title === '') {
            toast.error('Empty title!');
            return;
        }

        api.createPost(payload)
            .then(() => {
                history.push('/catalog');
                toast.success('Post created.');
            });
    }

    render() {
        return (
            <section id="viewSubmit">
                <Menu />
                <div className="submitArea">
                    <h1>Submit Link</h1>
                    <p>Please, fill out the form. A thumbnail image is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="submitForm" className="submitForm" onSubmit={this.onSubmitted}>
                        <label>Link URL:</label>
                        <input className="url" name="url" value={this.state.url} type="text" onChange={this.onChanged} />
                        <label>Link Title:</label>
                        <input className="title" name="title" value={this.state.title} type="text" onChange={this.onChanged} />
                        <label>Link Thumbnail Image (optional):</label>
                        <input className="imageUrl" name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.onChanged} />
                        <label>Comment (optional):</label>
                        <textarea className="description" name="description" onChange={this.onChanged} value={this.state.description} />
                        <input id="btnSubmitPost" defaultValue="Submit" type="submit" />
                    </form>
                </div>
            </section>
        );
    }
}

export default SubmitForm;