import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction, statsAction } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CreatePage from './components/Create/CreatePage';
import ProfilePage from './components/Profile/ProfilePage';
import DetailsPage from './components/Details/DetailsPage';
import Preloader from './components/common/Preloader';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        this.props.stats();
    }

    onLogout() {
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Preloader />
                <Header 
                    loggedIn={localStorage.getItem('authToken') != null} 
                    onLogout={this.onLogout} 
                    users={this.props.users}
                    furniture={this.props.furniture}
                />

                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/furniture/all/:page" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/furniture/create" component={CreatePage} />
                        <Route path="/furniture/mine" component={ProfilePage} />
                        <Route path="/furniture/details/:id" component={DetailsPage} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

function mapState(state) {
    return {
        users: state.stats.users,
        furniture: state.stats.furniture
    };
}

function mapDispatch(dispatch) {
    return {
        logout: () => dispatch(logoutAction()),
        stats: () => dispatch(statsAction())
    };
}


export default withRouter(connect(mapState, mapDispatch)(App));