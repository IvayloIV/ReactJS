import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { detailsEventAction, joinEventAction, removeEventAction } from '../../actions/eventActions';

export class Details extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoad: true };

        this.joinEventHandler = this.joinEventHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.props.loadDetails(eventId).then(() => {
            this.setState({ isLoad: false });
        });
    }

    joinEventHandler() {
        const event = this.props.events[0];
        this.props.joinEvent(event._id, event);
    }
    
    removeHandler() {
        const event = this.props.events[0];
        this.props.removeEvent(event._id).then(() => {
            this.props.history.push('/event/all');
        });
    }

    render() {
        if (this.state.isLoad) {
            return null;
        }

        const event = this.props.events[0];
        const userId = sessionStorage.getItem('userId');
        const isOwner = event._acl.creator === userId;
        return (
            <div className="row event-details">
                <div className="col-md-12 text-center overflow-hidden">
                    <img className="details-img" src={event.imageURL} />
                    <div className="my-3 p-3">
                        <h2 className="display-5">{event.name}</h2>
                        <p className="infoType">Description:</p>
                        <p className="event-description">{event.description}</p>
                        <p className="infoType">Date: <small>{event.dateTime}</small></p>
                        <p className="infoType">Peope interested in: <small>{event.peopleInterestedIn}</small></p>
                        <p className="infoType">Organizer: <small>{event.organizer}</small></p>
                    </div>


                    {isOwner && <Link to={`/event/edit/${event._id}`} className="btn btn-primary btn-lg">Edit the event</Link>}
                    {isOwner && <a href="javascript:void(0)" onClick={this.removeHandler} className="btn btn-danger btn-lg">Close the event</a>}
                    {!isOwner && <a href="javascript:void(0)" onClick={this.joinEventHandler} className="btn btn-info btn-lg">Join the event</a>}
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        events: state.events
    };
}

function mapDispatch(dispatch) {
    return {
        loadDetails: (eventId) => dispatch(detailsEventAction(eventId)),
        joinEvent: (eventId, body) => dispatch(joinEventAction(eventId, body)),
        removeEvent: (eventId) => dispatch(removeEventAction(eventId))
    };
}

export default withRouter(connect(mapState, mapDispatch)(Details));
