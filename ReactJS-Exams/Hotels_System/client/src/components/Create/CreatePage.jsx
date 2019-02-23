import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../common/Input';
import { createHotelAction } from '../../actions/hotelActions';
import { toast } from 'react-toastify';

export class CreatePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			location: '',
			description: '',
			numberOfRooms: '',
			image: '',
			parkingSlots: ''
		}

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onChangeHandler(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitHandler(e) {
		e.preventDefault();
		const { name, location, description, numberOfRooms, image, parkingSlots } = this.state;

		if (name === '' || location === '' || description === '' 
			|| numberOfRooms === '' || image === '' || parkingSlots === '') {
			toast.error('Fill all fields.');
			return;
		}

		this.props.createHotel({
			name,
			location,
			description,
			numberOfRooms: Number(numberOfRooms),
			image,
			parkingSlots: Number(parkingSlots)
		}).then((json) => {
			if (json.success) {
				this.props.history.push('/');
			}
			
			toast.success(json.message);
		});
	}

	render() {
		return (
			<div className="container">
				<h1>Create Hotel</h1>
				<form onSubmit={this.onSubmitHandler}>
					<Input
						name="name"
						value={this.state.name}
						onChange={this.onChangeHandler}
						label="Name"
					/>
					<Input
						name="location"
						value={this.state.location}
						onChange={this.onChangeHandler}
						label="Location"
					/>
					<Input
						name="description"
						value={this.state.description}
						onChange={this.onChangeHandler}
						label="Description"
					/>
					<Input
						name="numberOfRooms"
						value={this.state.numberOfRooms}
						onChange={this.onChangeHandler}
						label="Number of Rooms"
					/>
					<Input
						name="image"
						value={this.state.image}
						onChange={this.onChangeHandler}
						label="Image"
					/>
					<Input
						name="parkingSlots"
						value={this.state.parkingSlots}
						onChange={this.onChangeHandler}
						label="Parking slots"
					/>
					<input type="submit" value="Create" />
				</form>
			</div>
		)
	}
}

function mapDispatch(dispatch) {
    return {
        createHotel: (body) => dispatch(createHotelAction(body))
    };
}

export default withRouter(connect(null, mapDispatch)(CreatePage));
