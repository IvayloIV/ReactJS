import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHotelsDetailsAction } from '../../actions/hotelActions';
import { createReviewAction } from '../../actions/reviewActions';
import CreateReview from './CreateReview';
import Review from './Review';

export class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.hotelDetails(id).then((json) => {
            this.setState({ isLoading: false });
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        const { description, image, location, name, numberOfRooms, parkingSlots, id, reviews } = this.props.hotels[0];

        return (
            <div>
                <div className="hotel-details">
                    <div>
                        <img src={image} alt="hotel-image" />
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p>Location: {location}</p>
                        <p>Rooms: {numberOfRooms}</p>
                        <p>Parking slots: {parkingSlots}</p>
                    </div>
                </div>
                <CreateReview createReview={(data) => this.props.createReview(id, data)}/>
                {reviews.map((r, i) => 
                    <Review
                        key={i}
                        comment={r.comment}
                        rating={r.rating}
                    />
                )}
            </div>
        )
    }
}

function mapState(state) {
    return {
        hotels: state.hotel
    };
}

function mapDispatch(dispatch) {
    return {
        hotelDetails: (id) => dispatch(getHotelsDetailsAction(id)),
        createReview: (id, data) => dispatch(createReviewAction(id, data))
    };
}

export default connect(mapState, mapDispatch)(DetailsPage);
