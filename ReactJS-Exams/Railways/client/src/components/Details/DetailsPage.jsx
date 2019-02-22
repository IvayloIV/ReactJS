import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tripDetailsAction } from '../../actions/tripActions';
import { addTicketAction } from '../../actions/cartAction';
import Image from '../../static/img/Sheffield.png';
import Ticket from './Ticket';

export class DetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingData: true
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const id = this.props.match.params.id;
        this.props.tripDetails(id).then(() => {
            this.setState({loadingData: false});
        });
    }

    render() {
        let origin, destination, time, arrives, duration;
        let tickets = [];

        if (this.state.loadingData) {
            origin = 'Loading...';
            destination = 'Loading...';
            time = 'Loading...';
            arrives = 'Loading...';
            duration = 'Loading...';
        } else {
            const currentTrip = this.props.trip[0];
            origin = currentTrip.origin;
            destination = currentTrip.destination;
            time = currentTrip.time;
            arrives = currentTrip.arrives;
            duration = currentTrip.duration;

            let count = 1;
            for (let key in currentTrip.tickets) {
                tickets.push(<Ticket
                    key={count++} 
                    tripId={currentTrip._id}
                    classType={key} 
                    price={currentTrip.tickets[key]} 
                    addTicket={this.props.addTicket}
                />);
            }
        }

        return (
            <div>
                <section className="ticket-area">
                    <div className="ticket-area-left">
                        <img src={Image} alt="image-train" />
                    </div>
                    <div className="ticket-area-right">
                        <h3>{destination}</h3>
                        <div>from {origin}</div>
                        <div className="data-and-time">15 January {time}</div>
                        <div className="data-and-time">arrives {arrives}</div>
                        <div className="data-and-time">duration {duration}</div>
                    </div>
                </section>
                {tickets}
            </div>
        )
    }
}

function mapState(state) {
    return {
        trip: state.trip
    };
}

function mapDispatch(dispatch) {
    return {
        tripDetails: (id) => dispatch(tripDetailsAction(id)),
        addTicket: (data) => dispatch(addTicketAction(data))
    };
}

export default withRouter(connect(mapState, mapDispatch)(DetailsPage));
