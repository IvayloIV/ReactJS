import React from 'react';
import './Street.css';

function Street({ streetHoverEvent, id, location }) {
    return (
        <div className="Street" onMouseEnter={() => streetHoverEvent(id)}>
            <p className="street-info">{location}</p>
        </div>
    )
}

export default Street;