import React from 'react';

function MovieCard(props) {
  const { movie } = props;
  return (
    <React.Fragment>
        <h2>Title: {movie.title}</h2>
        <img src={movie.imageUrl} />
        <p>Available Tickets: {movie.tickets}</p>
    </React.Fragment>
  )
}

export default MovieCard;
