import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { detailsEventAction, editEventAction } from '../../actions/eventActions';

export class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: '',
            description: '',
            imageUrl: '',
            peopleInterestedIn: 0,
            organizer: '',
            eventId: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.props.loadDetails(eventId).then((event) => {
            this.setState({ 
                isLoad: false,
                name: event.name,
                date: event.dateTime,
                description: event.description,
                imageUrl: event.imageURL,
                peopleInterestedIn: event.peopleInterestedIn,
                organizer: event.organizer,
                eventId
            });
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { name, date, description, imageUrl, eventId } = this.state;

        if (name.length < 6) {
            toast.error('The event name should be at least 6 characters long.');
            return;
        }

        if (description.length < 10) {
            toast.error('The description should be at least 10 characters long.');
            return;
        }

        if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            toast.error('The image should start with "http://" or "https://".');
            return;
        }

        this.props.editEvent(eventId, this.state).then((json) => {
            if (!json.error) {
                this.props.history.push(`/event/details/${eventId}`);
            }
        });
    }

    render() {
        if (this.state.isLoad) {
            return null;
        }

        return (
            <form onSubmit={this.onSubmitHandler}>

                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">Edit Event</h1>
                </div>

                <Input
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    label="Name"
                />
                <Input
                    name="date"
                    value={this.state.date}
                    onChange={this.onChangeHandler}
                    label="Date"
                />
                <Input
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeHandler}
                    label="Description"
                />
                <Input
                    name="imageUrl"
                    value={this.state.imageUrl}
                    onChange={this.onChangeHandler}
                    label="Image url"
                />

                <button className="btn btn-lg btn-dark btn-block" type="submit">Edit it</button>
                <p className="mt-5 mb-3 text-muted text-center">© UniEnt - 2019.</p>
            </form>
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
        editEvent: (eventId, body) => dispatch(editEventAction(eventId, body))
    };
}

export default withRouter(connect(mapState, mapDispatch)(Edit));
