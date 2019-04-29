import React from 'react';
import { Link } from 'react-router-dom';

function EventCard(props) {
    const { name, _id, imageUrl } = props;
  return (
    <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden eventPlaceholder">
      <div className="my-3 p-3">
        <h2 className="display-5">{name}</h2>
      </div>
      <div>
        <div className="img"><img className="eventPicture"
            src={imageUrl} />
        </div>
        <Link to={`/event/details/${_id}`} className="eventDetails">More</Link>
      </div>
    </div>
  )
}

export default EventCard;
