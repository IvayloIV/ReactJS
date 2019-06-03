import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { logout } from './api/remote';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ListCars from './components/Car/ListCars';
import CreateCar from './components/Car/CreateCar';
import CarDetails from './components/Car/CarDetails';
import EditCar from './components/Car/EditCar';
import MyCars from './components/Car/MyCars';
import PrivateRoute from './components/common/PrivateRoute';

const App = (props) => {
    const onLogout = () => {
        logout().then(() => {
            sessionStorage.clear();
            toast.success('Logout successful.');
            props.history.push('/');
        });
    };

    return (
        <div id="container">
            <ToastContainer closeButton={false}/>
            <Header loggedIn={sessionStorage.getItem('authToken') != null} onLogout={onLogout} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/car/all" component={ListCars} />
                <PrivateRoute path="/car/create" component={CreateCar} />
                <PrivateRoute path="/car/details/:id" component={CarDetails} />
                <PrivateRoute path="/car/edit/:id" component={EditCar} />
                <PrivateRoute path="/car/my" component={MyCars} />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(App);