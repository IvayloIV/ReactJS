import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { logoutAction, redirect } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import MyFeedPage from './components/MyFeed/MyFeedPage';
import UserFeedPage from './components/UserFeed/UserFeedPage';
import DiscoverPage from './components/Discover/DiscoverPage';
import Preloader from './components/common/Preloader';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.logoutSuccess) {
            props.history.push('/');
            toast.success('Logout successful.');
            props.redirect();
        }

        return null;
    }

    render() {

        return (
            <div className="main">
				<ToastContainer closeButton={false}/>
                <Preloader />
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" render={() => {
                        return localStorage.getItem('authToken') == null ? <LoginPage /> : <HomePage />
                    }} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/feed/my" component={MyFeedPage} />
                    <Route path="/feed/:username" render={(props) => {
                        if (localStorage.getItem('username') === props.match.params.username) {
                            return <MyFeedPage {...props}/>
                        }
                        return <UserFeedPage {...props}/>
                    }} />
                    <Route path="/discover" component={DiscoverPage} />
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