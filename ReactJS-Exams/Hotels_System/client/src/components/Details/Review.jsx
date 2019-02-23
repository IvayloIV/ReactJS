import React from 'react';

function Review(props) {
    const { comment, rating } = props;
    return (
        <div className="review">
            <p>{comment}</p>
            <p>Rating - {rating}</p>
        </div>
    )
}

export default Review;
