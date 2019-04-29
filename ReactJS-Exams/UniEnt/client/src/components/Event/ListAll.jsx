import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllEventsAction } from '../../actions/eventActions';
import EventCard from './EventCard';
import EmptyList from './EmptyList';

export class ListAll extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoad: false };
    }

    componentDidMount() {
        this.props.getEvents().then(() => {
            this.setState({ isLoad: true });
        });
    }

    render() {
        if (!this.state.isLoad) {
            return null;
        }

        const events = this.props.events.sort((a, b) => Number(b['peopleInterestedIn']) - Number(a['peopleInterestedIn']));
        const eventsCount = events.length;
        return (
            <div>
                {eventsCount === 0 ?
                    <EmptyList /> :
                    <div id="eventsHolder">
                        {events.map(e => (
                            <EventCard
                                key={e._id}
                                _id={e._id}
                                name={e.name}
                                imageUrl={e.imageURL}
                            />
                        ))}
                    </div>
                }
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
        getEvents: () => dispatch(getAllEventsAction()),
    };
}

export default connect(mapState, mapDispatch)(ListAll);
