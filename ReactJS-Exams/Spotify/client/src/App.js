import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { logoutAction, redirect } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import PrivateRoute from './components/common/PrivateRoute';
import Create from './components/Song/Create';
import ListAll from './components/Song/ListAll';
import MySongs from './components/Song/MySongs';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.history.push('/login');
        this.props.logout();
    }

    render() {
        return (
            <div id="container">
				<ToastContainer closeButton={false}/>
                <Header loggedIn={sessionStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/song/all" component={ListAll} />
                    <PrivateRoute path="/song/create" component={Create} />
                    <PrivateRoute path="/song/my" component={MySongs} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

function mapState(state) {
    return {
        logoutSuccess: state.logout.success
    };
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction()),
        redirect: () => dispatch(redirect())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));