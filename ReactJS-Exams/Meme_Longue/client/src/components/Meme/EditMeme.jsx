import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { detailsMemeAction, editMemeAction } from '../../actions/memeActions';

class EditMeme extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: '',
            loading: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params['id'];
        this.props.getDetailsMeme(id).then((json) => {
            if (!json.error) {
                this.setState({
                    title: json.title,
                    description: json.description,
                    imageUrl: json.imageUrl,
                    loading: false
                });
            }
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { title, description, imageUrl } = this.state;
        const creator = sessionStorage.getItem('username');
        const id = this.props.match.params['id'];

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

        this.props.editMeme(id, creator, title, description, imageUrl)
            .then((json) => {
                if (!json.error) {
                    this.props.history.push('/meme/all');
                }
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <div id="edit-meme">
                <form onSubmit={this.onSubmitHandler}>
                    <h1>Edit Meme</h1>
                    <div className="container">
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

                        <button type="submit" className="registerbtn">Edit Meme</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        getDetailsMeme: (id) => dispatch(detailsMemeAction(id)),
        editMeme: (_id, creator, title, description, imageUrl) => dispatch(editMemeAction(_id, creator, title, description, imageUrl))
    };
}

export default withRouter(connect(null, mapDispatch)(EditMeme));