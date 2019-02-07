import React from 'react';
import {toast} from 'react-toastify';
import Menu from './Menu';
import history from '../../history';
import api from '../../utils/api';

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            url: '',
            imageUrl: '',
            id: '',
            author: ''
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
            author: this.state.author
        };

        if (!payload.url.startsWith('http')) {
            toast.error('Url must start with http!');
            return;
        }

        if (payload.title === '') {
            toast.error('Empty title!');
            return;
        }

        api.editPost(payload, this.state.id)
            .then(() => {
                history.push('/catalog');
                toast.success(`Post ${payload.title} updated.`);
            });
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        api.detailsPost(id)
            .then(d => d.json())
            .then(parsedData => {
                this.setState({
                    title: parsedData.title,
                    description: parsedData.description,
                    url: parsedData.url,
                    imageUrl: parsedData.imageUrl,
                    id,
                    author: parsedData.author
                });
            });
    }

    render() {
        return (
            <section id="viewEdit">
                <Menu />
                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
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

export default Edit;