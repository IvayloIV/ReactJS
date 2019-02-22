import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import DetailsPage from './components/Details/DetailsPage';
import CartPage from './components/Cart/CartPage';
import MyTicketsPage from './components/MyTickets/MyTicketsPage';
import { logoutAction } from './actions/authActions';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
        toast.success('Logout successful.');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <ToastContainer closeButton={false}/>
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/trip/details/:id" component={DetailsPage} />
                        <Route path="/cart" component={CartPage} />
                        <Route path="/ticket/my" component={MyTicketsPage} />
                    </Switch>
                    <Footer />
                </main>
            </div>
        );
    }
}

function mapState(state) {
    return {};
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));