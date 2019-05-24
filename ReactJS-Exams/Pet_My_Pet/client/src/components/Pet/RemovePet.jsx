import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPetDetailsAction, removePetAction } from '../../actions/petActions';

class PetDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const { id: petId } = this.props.match.params;
        this.props.loadPetDetails(petId).then(() => {
            this.setState({ loading: false });
        });
    }

    removePetHandler(petId) {
        this.props.removePet(petId)
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
            <section className="deletePet">
                <h3>{pet.name}</h3>
                <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
                <p className="img"><img src={pet.imageURL} /></p>
                <p className="description">{pet.description}</p>
                <button className="button" onClick={this.removePetHandler.bind(this, pet._id)}>Delete</button>
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
        loadPetDetails: (petId) => dispatch(getPetDetailsAction(petId)),
        removePet: (petId) => dispatch(removePetAction(petId))
    };
}

export default withRouter(connect(mapState, mapDispatch)(PetDetails));