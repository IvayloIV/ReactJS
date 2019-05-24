import React from 'react';
import { Link } from 'react-router-dom';

function PetCard(props) {
    const { _id, name, category, imageURL, description, likes } = props.pet;
    const { likePetHandler } = props;
    
    return (
        <li className="otherPet">
            <h3>Name: {name}</h3>
            <p>Category: {category}</p>
            <p className="img"><img src={imageURL} /></p>
            <p className="description">{description}</p>
            <div className="pet-info">
                <a href="javascript:void(0)" onClick={likePetHandler}><button className="button"><i className="fas fa-heart"></i> Pet</button></a>
                <Link to={'/pet/details/' + _id}><button className="button">Details</button></Link>
                <i className="fas fa-heart"></i> <span> {likes}</span>
            </div>
        </li>
    )
}

export default PetCard;
