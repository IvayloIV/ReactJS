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
import AllPets from './components/Pet/AllPets';
import CreatePet from './components/Pet/CreatePet';
import MyPets from './components/Pet/MyPets';
import PetDetails from './components/Pet/PetDetails';
import EditPet from './components/Pet/EditPet';
import RemovePet from './components/Pet/RemovePet';
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
                <main id="site-content">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/pet/all" component={AllPets} />
                        <PrivateRoute path="/pet/create" component={CreatePet} />
                        <PrivateRoute path="/pet/my" component={MyPets} />
                        <PrivateRoute path="/pet/details/:id" component={PetDetails} />
                        <PrivateRoute path="/pet/edit/:id" component={EditPet} />
                        <PrivateRoute path="/pet/remove/:id" component={RemovePet} />
                    </Switch>
                </main>
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