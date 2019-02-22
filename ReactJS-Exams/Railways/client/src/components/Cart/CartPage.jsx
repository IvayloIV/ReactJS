import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTicketsAction, removeTicketAction, checkoutAction } from '../../actions/cartAction';
import CartSection from './CartSection';

export class CartPage extends Component {
    constructor(props) {
        super(props);
        this.onCheckoutHandler = this.onCheckoutHandler.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('Login first.');
            this.props.history.push('/login');
            return;
        }

        this.props.getTickets();
    }

    onCheckoutHandler(e) {
        e.preventDefault();

        this.props.checkout()
            .then(() => {
                toast.success('Checkout successful.');
                this.props.history.push('/');
            });
    }

    render() {
        let totalSum = 0;
        const cart = [];

        for (let item of this.props.cart) {
            cart.push(
                <CartSection
                    key={item._id}
                    id={item._id}
                    price={item.price}
                    class={item.class}
                    origin={item.origin}
                    destination={item.destination}
                    data={item.data}
                    arrives={item.arrives}
                    duration={item.duration}
                    count={item.count}
                    removeTicketHandler={(id) => {
                        this.props.removeTicket(id).then(json => {
                            if (json.success) {
                                toast.success('Removed successful.');
                            }
                        });
                    }}
                />
            );

            totalSum += (item.price * Number(item.count));
        }

        return (
            <div>
                {cart}
                <section className="ticket-checkout">
                    <div className="total">Sub total: {totalSum}$</div>
                    <a href="javascript:void(0)" onClick={this.onCheckoutHandler} className="checkout">Checkout</a>
                </section>
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
        getTickets: () => dispatch(getTicketsAction()),
        removeTicket: (id) => dispatch(removeTicketAction(id)),
        checkout: () => dispatch(checkoutAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(CartPage));
