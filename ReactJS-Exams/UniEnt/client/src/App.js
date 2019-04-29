import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { logoutAction } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ListAll from './components/Event/ListAll';
import Create from './components/Event/Create';
import Details from './components/Event/Details';
import Edit from './components/Event/Edit';
import Profile from './components/Event/Profile';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout().then(() => {
            this.props.history.push('/login');
        });
    }

    render() {
        return (
            <div className="App">
				<ToastContainer closeButton={false}/>
                <Header loggedIn={sessionStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/event/all" component={ListAll} />
                    <PrivateRoute path="/event/create" component={Create} />
                    <PrivateRoute path="/event/details/:id" component={Details} />
                    <PrivateRoute path="/event/edit/:id" component={Edit} />
                    <PrivateRoute path="/event/my" component={Profile} />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    };
}

export default withRouter(connect(null, mapDispatch)(App));
