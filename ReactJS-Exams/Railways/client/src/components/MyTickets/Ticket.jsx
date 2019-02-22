import React from 'react';
import Image from '../../static/img/train-station.jpg';

function Ticket(props) {
    const { origin, destination, date, time, arrives, duration, class: className, price, count } = props;

    return (
        <section className="purchased-ticket">
            <div className="purchased-left">
                <img src={Image} alt="image-train" />
            </div>
            <div className="purchased-right">
                <div>
                    <h3>{destination}</h3><span>{date}</span>
                </div>
                <div>
                    from {origin} <span>{time}</span>
                </div>
                <div>
                    arrives <span>{arrives}</span>
                </div>
                <div>
                    duration <span>{duration}</span>
                </div>
                <p>{count} x {price}$ ({className === 'firstClass' ? 'First' : 'Second'} Class)</p>
            </div>

        </section>
    )
}

export default Ticket;
