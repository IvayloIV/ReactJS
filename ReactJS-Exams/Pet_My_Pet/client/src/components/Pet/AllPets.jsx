import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllPetsAction, likePetAction } from '../../actions/petActions';
import PetCard from './PetCard';

class AllPets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        };
    }

    componentDidMount() {
        this.props.loadPets();
    }

    static getDerivedStateFromProps(props, state) {
        let [type, category] = props.location.search.split('=');

        if (state.category !== category) {
            if (category === undefined) {
                category = '';
            }

            return { category };
        }

        return null;
    }

    changeCategory(newCategory) {
        this.props.history.push(`/pet/all?category=${newCategory}`);
    }

    likePetHandler(pet) {
        this.props.likePet(pet._id, pet);
    }

    render() {
        const { category } = this.state;
        const userId = sessionStorage.getItem('userId');
        let pets = this.props.pets.filter(a => a._acl.creator !== userId).sort((a, b) => Number(b['likes']) - Number(a['likes']));

        if (category !== '') {
            pets = pets.filter(a => a.category === category);
        }
        
        return (
            <section className="dashboard">
                <h1>Dashboard</h1>
                <nav className="navbar">
                    <ul>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, '')}>All</a></li>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, 'Cat')}>Cats</a></li>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, 'Dog')}>Dogs</a></li>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, 'Parrot')}>Parrots</a></li>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, 'Reptile')}>Reptiles</a></li>
                        <li><a href="javascript:void(0)" onClick={this.changeCategory.bind(this, 'Other')}>Other</a></li>
                    </ul>
                </nav>
                <ul className="other-pets-list">
                    {pets.map(p => (
                        <PetCard key={p._id} pet={p} likePetHandler={this.likePetHandler.bind(this, p)}/>
                    ))}
                </ul>
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
        loadPets: () => dispatch(getAllPetsAction()),
        likePet: (petId, payload) => dispatch(likePetAction(petId, payload))
    };
}

export default withRouter(connect(mapState, mapDispatch)(AllPets));