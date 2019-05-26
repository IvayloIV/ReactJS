import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { logoutAction } from './actions/authActions';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ListMemes from './components/Meme/ListMemes';
import CreateMeme from './components/Meme/CreateMeme';
import EditMeme from './components/Meme/EditMeme';
import UserProfile from './components/User/UserProfile';
import MemeDetails from './components/Meme/MemeDetails';
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
                    <PrivateRoute path="/meme/all" component={ListMemes} />
                    <PrivateRoute path="/meme/create" component={CreateMeme} />
                    <PrivateRoute path="/meme/edit/:id" component={EditMeme} />
                    <PrivateRoute path="/user/profile/:id" component={UserProfile} />
                    <PrivateRoute path="/meme/details/:id" component={MemeDetails} />
                </Switch>
                <Footer/>
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