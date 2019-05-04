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
import ListRecipes from './components/Recipe/ListRecipes';
import CreateRecipe from './components/Recipe/CreateRecipe';
import RecipeDetails from './components/Recipe/RecipeDetails';
import EditRecipe from './components/Recipe/EditRecipe';
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
            <div id="rooter" className="cover-container w-100 d-flex h-100 p-3 mx-auto flex-column">
				<ToastContainer closeButton={false}/>
                <Header loggedIn={sessionStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/recipe/all" component={ListRecipes} />
                    <PrivateRoute path="/recipe/create" component={CreateRecipe} />
                    <PrivateRoute path="/recipe/details/:id" component={RecipeDetails} />
                    <PrivateRoute path="/recipe/edit/:id" component={EditRecipe} />
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