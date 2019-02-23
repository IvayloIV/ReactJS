import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class CreateReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            rating: '5'
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { comment, rating } = this.state;

        if (comment === '') {
            toast.error('Comment field is empty.');
            return;
        }

        this.props.createReview({
            comment,
            rating: Number(rating)
        }).then(() => {
            this.setState({
                comment: '',
                rating: '5'
            });
            toast.success('Created success.');
        });
    }

    render() {
        const { comment, rating } = this.state;

        return (
            <div className="create-review">
                <form onSubmit={this.onSubmitHandler}>
                    <p>Review:</p>
                    <textarea name="comment" onChange={this.onChangeHandler} value={comment} cols="50" rows="7" />
                    <p>Rating: </p>
                    <p>
                        <select name="rating" value={rating} onChange={this.onChangeHandler}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                    <input type="submit" value="Create review"/>
                </form>
            </div>
        )
    }
}

export default CreateReview;
