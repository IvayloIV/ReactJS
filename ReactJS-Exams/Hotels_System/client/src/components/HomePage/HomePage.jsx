import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getHotelsAction } from '../../actions/hotelActions';
import Hotel from './Hotel';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevPage: this.props.match.params.page || '1'
        }
    }

    static getDerivedStateFromProps(props, state) {
        const currentPage = props.match.params.page;
        if (currentPage && state.prevPage !== currentPage) {
            props.getHotelsPerPage(currentPage);
            return { prevPage: currentPage };
        }

        return null;
    }

    componentDidMount() {
        this.props.getHotelsPerPage(this.state.prevPage);
    }

    render() {
        let { prevPage: page } = this.state;

        return (
            <div className="container">
                <h1>Welcome</h1>
                <div>Page {page}</div>
                <div className="hotels">
                    {this.props.hotels.map(h => {
                        const { image, location, name, numberOfRooms, parkingSlots, id } = h;
                        return (
                        <Hotel 
                            key={id}
                            id={id}
                            image={image}
                            location={location}
                            name={name}
                            numberOfRooms={numberOfRooms}
                            parkingSlots={parkingSlots}
                        />)
                    })}
                </div>
                <div className="arrows">
                    {Number(page) > 1 && <Link to={`/hotels/${Number(page) - 1}`}><span>&#8592;</span></Link>}
                    <Link to={`/hotels/${Number(page) + 1}`}><span>&#8594;</span></Link>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    return {
        hotels: state.hotel
    };
}

function mapDispatch(dispatch) {
    return {
        getHotelsPerPage: (page) => dispatch(getHotelsAction(page))
    };
}

export default withRouter(connect(mapState, mapDispatch)(HomePage));