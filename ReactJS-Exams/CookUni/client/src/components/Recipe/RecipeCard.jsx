import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="our-team-main">

                        <div className="team-front">
                            <img src={props.foodImageURL} />
                            <h3>{props.meal}</h3>
                            <p>{props.description}</p>
                        </div>

                        <div className="team-back">
                            <div className="back-side-info">
                                <h4>Ingredients</h4>
                                <ul>
                                    {props.ingredients.map((a, i) => (
                                        <li key={i}>{a}</li>
                                    ))}
                                </ul>
                                <Link to={`/recipe/details/${props._id}`}>View the recepie</Link>
                            </div>

                            <img className="foodImage" src={props.categoryImageURL} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeCard;
