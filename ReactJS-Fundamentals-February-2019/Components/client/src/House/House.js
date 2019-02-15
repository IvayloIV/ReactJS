import React from 'react';
import './House.css';

const House = ({ id, imageUrl, houseHoverEvent }) => {
    return (
        <div className="House" onMouseEnter={() => houseHoverEvent(id)}>
            <img src={imageUrl}></img>
        </div>
    )
}

export default House
