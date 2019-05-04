import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        if (sessionStorage.getItem('authToken')) {
            return <Redirect to="/recipe/all"/>
        }

        return (
            <main role="main" className="inner cover mt-5">
                <h1 className="cover-heading">Coooooking University</h1>
                <p className="lead">They say that food passes through the stomach, we say that food passes through CookUni...
                </p>
            </main>
        );
    }
}