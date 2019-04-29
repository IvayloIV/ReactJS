import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myEventsAction } from '../../actions/eventActions';
import ProfileImage from '../../images/user.png';

export class Profile extends Component {
    componentDidMount() {
        this.props.loadMyEvents();
    }

    render() {
        const myEvents = this.props.events;
        const username = sessionStorage.getItem('username');

        return (
            <div className="col-md-6 text-center col-lg">
                <img className="profile-img" src={ProfileImage} />
                <div className="profile-info">
                <p>Username: <small>{username}</small></p>
                <p className="infoType">Organizer of {myEvents.length} events.</p>
                {myEvents.length === 0 ? <p>No events</p> : myEvents.map(e => <p key={e._id}>{e.name}</p>)}
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
        loadMyEvents: () => dispatch(myEventsAction())
    };
}

export default connect(mapState, mapDispatch)(Profile);
