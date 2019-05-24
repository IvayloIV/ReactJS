import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPetDetailsAction, editPetAction } from '../../actions/petActions';

class EditPet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            loading: true
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const { id: petId } = this.props.match.params;
        
        this.props.loadPet(petId).then((json) => {
            const { description } = json;
            this.setState({ description, loading: false });
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { _id: petId, name, imageURL, category, likes } = this.props.pets[0];
        const { description } = this.state;
        this.props.editPet(petId, name, description, imageURL, category, likes)
            .then((json) => {
                if (!json.error) {
                    this.props.history.push('/pet/my');
                }
            });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const pet = this.props.pets[0];
        return (
            <section className="detailsMyPet">
                <h3>{pet.name}</h3>
                <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
                <p className="img"><img src={pet.imageURL} /></p>
                <form onSubmit={this.onSubmitHandler}>
                    <textarea type="text" name="description" value={this.state.description} 
                        onChange={this.onChangeHandler}/>
                    <button className="button"> Save</button>
                </form>
            </section>
        );
    }
}

function mapState(state) {
    return {
        pets: state.pets
    };
}

function mapDispatch(dispatch) {
    return {
        loadPet: (petId) => dispatch(getPetDetailsAction(petId)),
        editPet: (petId, name, description, imageURL, category, likes) => dispatch(editPetAction(petId, name, description, imageURL, category, likes))
    };
}

export default withRouter(connect(mapState, mapDispatch)(EditPet));