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
import CreateMovie from './components/Movie/CreateMovie';
import Cinema from './components/Movie/Cinema';
import MyMovies from './components/Movie/MyMovies';
import MovieDetails from './components/Movie/MovieDetails';
import EditMovie from './components/Movie/EditMovie';
import RemoveMovie from './components/Movie/RemoveMovie';
import PrivateRoute from './components/common/PrivateRoute';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout().then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="container">
				<ToastContainer closeButton={false}/>
                <Header loggedIn={sessionStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/movie/create" component={CreateMovie} />
                    <PrivateRoute path="/movie/all" component={Cinema} />
                    <PrivateRoute path="/movie/my" component={MyMovies} />
                    <PrivateRoute path="/movie/details/:id" component={MovieDetails} />
                    <PrivateRoute path="/movie/edit/:id" component={EditMovie} />
                    <PrivateRoute path="/movie/remove/:id" component={RemoveMovie} />
                </Switch>
                <Footer />
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