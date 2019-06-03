import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ _id, title, imageUrl, brand, seller, fuel, year, price, isOwner, removeCarHandler }) => {
    return (
        <div className="listing">
            <p>{title}</p>
            <img src={imageUrl} />
            <h2>Brand: {brand}</h2>
            <div className="info">
                <div id="data-info">
                    <h3>Seller: {seller}</h3>
                    <h3>Fuel: {fuel}</h3>
                    <h3>Year: {year}</h3>
                    <h3>Price: {price} $</h3>
                </div>
                <div id="data-buttons">
                    <ul>
                        <li className="action">
                            <Link to={`/car/details/${_id}`} className="button-carDetails">Details</Link>
                        </li>
                        {isOwner && 
                        <li className="action">
                            <Link to={`/car/edit/${_id}`} className="button-carDetails">edit</Link>
                        </li>}
                        {isOwner && 
                        <li className="action">
                            <a href="javascript:void(0)" onClick={removeCarHandler.bind(null, _id)} className="button-carDetails">delete</a>
                        </li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
