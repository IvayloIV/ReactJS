import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../static/img/train-station.jpg';

function Train({ id, origin, destination, time, arrives, duration }) {
    return (
        <Link to={'/trip/details/' + id} className="added-train">
            <img src={Image} alt={destination + ' image'} className="picture-added-train" />
            <h3>{destination}</h3>
            <span>from {origin}</span>
            <span>departs {time}</span>
            <span>arrives {arrives}</span>
            <span>duration {duration}</span>
        </Link>
    )
}

export default Train;
