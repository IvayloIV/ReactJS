import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tripSuccessAction, searchTripAction } from '../../actions/tripActions';
import Train from '../common/Train';
import Search from '../common/Search';

class HomePage extends Component {
    componentDidMount() {
        this.props.loadTrips();
    }

    render() {
        return (
            <div className="train-logo">
                <Search searchTrips={this.props.searchTrips} />
                <section className="added-trains">
                    {this.props.trip.map(t => 
                        <Train 
                            key={t._id}
                            id={t._id}
                            origin={t.origin}
                            destination={t.destination}
                            time={t.time}
                            arrives={t.arrives}
                            duration={t.duration}
                        />
                    )}
                </section>
            </div>
        );
    }
}

function mapState(state) {
    return {
        trip: state.trip
    };
}

function mapDispatch(dispatch) {
    return {
        loadTrips: () => dispatch(tripSuccessAction()),
        searchTrips: (origin, destination, date) => dispatch(searchTripAction(origin, destination, date)),
    };
}

export default connect(mapState, mapDispatch)(HomePage);
