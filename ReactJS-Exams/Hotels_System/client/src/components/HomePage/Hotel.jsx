import React from 'react';
import { Link } from 'react-router-dom';

function Hotel(props) {
    const { image, location, name, numberOfRooms, parkingSlots, id } = props;
    const isAuth = localStorage.getItem('authToken');

    return (
        <div className="hotel">
            <img src={image} alt="image-hotel" />
            <h3>{name}</h3>
            <p>Location: {location}</p>
            <p>Rooms: {numberOfRooms}</p>
            <p>Parking slots: {parkingSlots}</p>
            {isAuth && <Link to={`/hotel/details/${id}`}><button>Details</button></Link>}
        </div>
    )
}

export default Hotel;
