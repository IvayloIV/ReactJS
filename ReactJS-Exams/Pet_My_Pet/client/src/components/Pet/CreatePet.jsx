import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import { createPetAction } from '../../actions/petActions';

class CreatePet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            imageURL: '',
            category: 'Cat'
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { name, description, imageURL, category } = this.state;
        this.props.createPet(name, description, imageURL, category)
            .then((json) => {
                if (!json.error) {
                    this.props.history.push('/pet/my');
                }
            });        
    }

    render() {
        return (
            <section className="create">
                <form onSubmit={this.onSubmitHandler}>
                    <fieldset>
                        <legend>Add new Pet</legend>
                        <p className="field">
                            <label htmlFor="name">Name</label>
                            <span className="input">
                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                    label="Name"
                                />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="description">Description</label>
                            <span className="input">
                                <textarea rows="4" cols="45" type="text" name="description" id="description"
                                    placeholder="Description" onChange={this.onChangeHandler} value={this.state.description} />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="image">Image</label>
                            <span className="input">
                                <Input
                                    name="imageURL"
                                    value={this.state.imageURL}
                                    onChange={this.onChangeHandler}
                                    label="Image Url"
                                />
                                <span className="actions"></span>
                            </span>
                        </p>
                        <p className="field">
                            <label htmlFor="category">Category</label>
                            <span className="input">
                                <select type="text" name="category" onChange={this.onChangeHandler} value={this.state.category}>
                                    <option>Cat</option>
                                    <option>Dog</option>
                                    <option>Parrot</option>
                                    <option>Reptile</option>
                                    <option>Other</option>
                                </select>
                                <span className="actions"></span>
                            </span>
                        </p>
                        <input className="button submit" type="submit" value="Add Pet" />
                    </fieldset>
                </form>
            </section>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        createPet: (name, description, imageURL, category) => dispatch(createPetAction(name, description, imageURL, category))
    };
}

export default withRouter(connect(null, mapDispatch)(CreatePet));