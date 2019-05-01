import React, { Component } from 'react';
import HomeImage from '../../images/background.jpg';

export default class HomePage extends Component {
    render() {
        return (
            <img className="background" src={HomeImage} />
        );
    }
}