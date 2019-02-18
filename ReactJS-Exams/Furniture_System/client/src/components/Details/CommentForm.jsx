import React from 'react'
const ratingCount = 5;

function CommentForm(props) {
    const { rating, comment, onChangeHandler, onSubmitHandler, onClickHandler } = props;
    const ratingArr = [];

    for (let i = 1; i <= ratingCount; i++) {
        ratingArr.push(
            <button 
                key={i}
                id={i}
                name="rating"
                type="button" 
                className={`btn${rating == i ? ' btn-primary' : ' btn-secondary'}`}
                onClick={onClickHandler}
            >{i}</button>
            );
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <legend>Leave a review</legend>
            <div className="form-group">
                <textarea name="comment" className="form-control" onChange={onChangeHandler} value={comment} />
            </div>
            <div className="form-group">
                <label>Rating</label>
                <div className="btn-group mr-2" role="group" aria-label="First group">
                    {ratingArr}
                </div>
                <input type="submit" className="btn btn-primary" defaultValue="Submit review" />
            </div>
        </form>
    )
}

export default CommentForm
