import React, { Component } from 'react';
import { getStreets } from './api/street';
import './App.css';
import Street from './Street/Street';
import House from './House/House';
import HouseDetails from './HouseDetails/HouseDetails';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			streets: [],
			selectedStreetIdx: 0,
			selectedHouseIdx: 0,
			hasFetched: false
		};
	}

	componentDidMount() {
		getStreets().then(data => this.setState({
			streets: data.streets,
			hasFetched: true
		}));
	}

	getSelectedStreet() {
		return this.state.streets[this.state.selectedStreetIdx].homes;
	}

	getSelectedHouse() {
		return this.state.streets[this.state.selectedStreetIdx]
			.homes[this.state.selectedHouseIdx];
	}

	streetHoverEvent(idx) {
		this.setState({ selectedStreetIdx: idx });
	}

	houseHoverEvent(idx) {
		this.setState({ selectedHouseIdx: idx });
	}

	render() {
		if (!this.state.hasFetched) {
			return null;
		}

		const houses = this.state.streets.length > 0 && this.getSelectedStreet();
		const selectedHouse = this.state.streets.length > 0 && this.getSelectedHouse();

		return (
			<div className="App">
				<div className="streets">
					<h2>Streets</h2>
					{this.state.streets.map((street, idx) => {
						return (<Street
							location={street.location}
							key={idx}
							id={idx}
							streetHoverEvent={this.streetHoverEvent.bind(this)}
						/>);
					})}
				</div>
				<div className="houses">
					<h2>House</h2>
					{houses && houses.map((house, index) => {
						return (<House
							imageUrl={house.imageUrl}
							key={index}
							id={index}
							houseHoverEvent={this.houseHoverEvent.bind(this)}
						/>)
					})}
				</div>
				{selectedHouse ? <HouseDetails
					type={selectedHouse.type}
					description={selectedHouse.description}
					imageUrl={selectedHouse.imageUrl}
					price={selectedHouse.price}
					key={this.state.selectedHouseIdx}
				/> : null}
			</div>
		);
	}
}

export default App;
