import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';

import CommentFrom from './CommentForm';
import { detailsFurnitureAction, createReviewAction, likeFurnitureAction } from '../../actions/furnitureAction';

import Review from './Review';

export class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: '3',
            comment: ''
        }
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickHandler(e) {
        this.setState({ [e.target.name]: e.target.id });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.createReview(this.props.match.params.id, {
            rating: this.state.rating,
            comment: this.state.comment,
        }).then(json => {
            if (json.success) {
                this.setState({ comment: '' });
            }
        });
    }

    like(e) {
        const id = this.props.match.params.id;
        this.props.likeFurniture(id);
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const id = this.props.match.params.id;
        this.props.detailsFurniture(id);
    }

    render() {
        let currentFurniture = this.props.furniture[0];
        if (!currentFurniture || this.props.match.params.id != currentFurniture.id) {
            currentFurniture = {
                image: 'Loading...',
                make: 'Loading...',
                model: 'Loading...',
                year: 'Loading...',
                description: 'Loading...',
                price: 'Loading...',
                material: 'Loading...',
                reviews: []
            };
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Furniture Details</h1>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-4">
                        <div className="card text-white bg-primary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <img src={currentFurniture.image} />
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <p>Make: {currentFurniture.make}</p>
                        <p>Model: {currentFurniture.model}</p>
                        <p>Year: {currentFurniture.year}</p>
                        <p>Description: {currentFurniture.description}</p>
                        <p>Price: {currentFurniture.price}</p>
                        <p>Material: {currentFurniture.material}</p>
                        <a href="javascript:void(0)" onClick={this.like.bind(this)} className="btn btn-primary">Like</a>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-8">
                        <CommentFrom
                            rating={this.state.rating}
                            comment={this.state.comment}
                            onChangeHandler={this.onChangeHandler.bind(this)}
                            onSubmitHandler={this.onSubmitHandler.bind(this)}
                            onClickHandler={this.onClickHandler.bind(this)}
                        />
                    </div>
                    {currentFurniture.reviews && currentFurniture.reviews.map((r, i) => {
                        return (<Review comment={r.comment} rating={r.rating} key={i} />);
                    })}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        furniture: state.furniture
    };
}

function mapDispatch(dispatch) {
    return {
        detailsFurniture: (id) => dispatch(detailsFurnitureAction(id)),
        createReview: (id, data) => dispatch(createReviewAction(id, data)),
        likeFurniture: (id) => dispatch(likeFurnitureAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(DetailsPage));
