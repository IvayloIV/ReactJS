import React from 'react';
import Image from '../../static/img/train-station.jpg';

function CartSection(props) {
    const { id, price, class: className, origin, destination, data, arrives, duration, count, removeTicketHandler } = props;

    return (
        <section className="single-ticket">
            <div className="left-ticket-container">
                <img src={Image} alt="image-train" className="destination-img" />
                <div className="train-parameters">
                    <span className="ticket-price">Price: {price}$</span>
                    <span className="ticket-class">{className === 'firstClass' ? 'First' : 'Second'} Class</span>
                </div>
            </div>
            <div className="right-ticket-container">
                <h2>{destination}</h2>
                <p>from {origin}</p>
                <p>{data}</p>
                <p>arrives {arrives} (duration {duration})</p>
                <p></p>
                <div>
                    <span className="number-of-tickets">{count}</span>
                    <a href="javascript:void(0)" onClick={() => removeTicketHandler(id)} className="remove">REMOVE</a>
                </div>
            </div>
        </section>
    )
}

export default CartSection;
