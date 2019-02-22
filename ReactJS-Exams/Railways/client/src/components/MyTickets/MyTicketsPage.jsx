import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { myTrainsAction } from '../../actions/cartAction';
import Ticket from './Ticket';

export class MyTicketsPage extends Component {
    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/login');
            return;
        }

        this.props.myTrains();
    }

    render() {
        return (
            <div>
                <h2>Your Trains</h2>
                {this.props.cart.map(c =>{
                    const { origin, destination, date, time, arrives, duration, class: className, price, count } = c;

                    return (<Ticket 
                        key={c._id}
                        origin={origin}
                        destination={destination}
                        date={date}
                        time={time}
                        arrives={arrives}
                        duration={duration}
                        class={className}
                        price={price}
                        count={count}
                    />)
                })}
            </div>
        )
    }
}

function mapState(state) {
    return {
        cart: state.cart
    };
}

function mapDispatch(dispatch) {
    return {
        myTrains: () => dispatch(myTrainsAction()),
    };
}

export default withRouter(connect(mapState, mapDispatch)(MyTicketsPage));
