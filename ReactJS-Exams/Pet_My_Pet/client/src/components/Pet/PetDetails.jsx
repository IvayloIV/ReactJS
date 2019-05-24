import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPetDetailsAction, likePetAction } from '../../actions/petActions';

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

    likePetHandler(pet) {
        this.props.likePet(pet._id, pet);
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const pet = this.props.pets[0];
        return (
             <section className="detailsOtherPet">
                <h3>{pet.name}</h3>
                <p>
                    Pet counter: {pet.likes} 
                    <a href="javascript:void(0)" onClick={this.likePetHandler.bind(this, pet)}>
                        <button className="button"><i className="fas fa-heart"></i>Pet</button>
                    </a>
                </p>
                <p className="img"><img src={pet.imageURL} /></p>
				<p className="description">{pet.description}</p>
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
        likePet: (petId, payload) => dispatch(likePetAction(petId, payload))
    };
}

export default withRouter(connect(mapState, mapDispatch)(PetDetails));