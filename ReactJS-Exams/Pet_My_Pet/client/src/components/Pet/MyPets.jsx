import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getMyPetsAction } from '../../actions/petActions';

class MyPets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.props.loadMyPets().then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return null;
        }
        const pets = this.props.pets;
        
        return (
            <section className="my-pets">
                <h1>My Pets</h1>
                <ul className="my-pets-list">
                    {pets.map(p => (
                        <section className="myPet" key={p._id}>
                        <h3>Name: {p.name}</h3>
                        <p>Category: {p.category}</p>
                        <p className="img"><img src={p.imageURL} /></p>
                        <p className="description">{p.description}</p>
                        <div className="pet-info">
                            <Link to={`/pet/edit/${p._id}`}><button className="button">Edit</button></Link>
                            <Link to={`/pet/remove/${p._id}`}><button className="button">Delete</button></Link>
                            <i className="fas fa-heart"></i> <span>{p.likes}</span>
                        </div>
                    </section>
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
        loadMyPets: () => dispatch(getMyPetsAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(MyPets));