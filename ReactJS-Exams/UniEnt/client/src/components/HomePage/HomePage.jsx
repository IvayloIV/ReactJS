import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Image from '../../images/events.png';

class HomePage extends Component {
    componentDidMount() {
        if (sessionStorage.getItem('authToken')) {
            this.props.history.push('/event/all');
        }
    }

    render() {
        return (
            <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                <div style={{paddingLeft:'7%', paddingTop: '3%'}} className="col-md-7">
                    <h2 className="featurette-heading">The events that <span className="text-muted">will blow your mind!</span></h2>
                    <p className="lead">Join our community.</p>
                    <p style={{paddingLeft:'5%'}} className="lead">Organizie an event.</p>
                    <p style={{paddingLeft:'10%'}} className="lead">Gathered as many people as possible for one purpose.</p>
                    <p style={{paddingLeft:'15%'}} className="lead">Learn!</p>
                    <p style={{paddingLeft:'20%'}} className="lead">Share!</p>
                    <p style={{paddingLeft:'25%'}} className="lead">Enjoy the life!</p>
                </div>
                <div className="col-md-5">
                    <img className="home-event-picture" src={Image} />
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);
