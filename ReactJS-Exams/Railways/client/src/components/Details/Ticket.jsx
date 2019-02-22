import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        const { tripId, classType } = this.props;
        this.props.addTicket({
            tripId: tripId,
            date: new Date(Date.now()).toLocaleString(),
            class: classType,
            count: Number(this.state.count)
        }).then(e => {
            this.setState({ count: '' });
            toast.success('Ticket created.');
        });
    }

    render() {
        const { classType, price } = this.props;
        const { count } = this.state;
        return (
            <section className="train-details">
                <form onSubmit={this.onSubmitHandler} className="seat-form">
                    <span>{price}$</span><span>{(classType === 'firstClass' ? 'First' : 'Second') + ' class'}</span>
                    <input type="text" name="count" onChange={this.onChangeHandler} value={count} placeholder="Add Number" />
                    <input type="submit" className="create-seat" value="Add to Cart" />
                </form>
            </section>
        )
    }
}

export default Ticket;
