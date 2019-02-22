import React, { Component } from 'react';
import Input from '../common/Input';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destination: '',
            origin: '',
            departure: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { origin, destination, departure } = this.state;
        this.props.searchTrips(origin, destination, departure);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="search-form">
                <Input
                    name="destination"
                    value={this.state.destination}
                    onChange={this.onChangeHandler}
                    label="Destination"
                />
                <Input
                    name="origin"
                    value={this.state.origin}
                    onChange={this.onChangeHandler}
                    label="Origin"
                />
                <Input
                    name="departure"
                    value={this.state.departure}
                    onChange={this.onChangeHandler}
                    label="Departure"
                />
                <input type="submit" className="search" value="Search" />
            </form>
        )
    }
}

export default Search;
