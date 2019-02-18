import React from 'react';

function Review(props) {
    const {comment, rating} = props;

    return (
        <div className="col-md-8">
            <div className="card text-black bg-light">
                <div className="card-body">
                    <blockquote className="card-blockquote">
                        <p>{comment}</p>
                        <footer>Rating: 
                                    <cite title="Source Title"> {rating}</cite>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Review;
