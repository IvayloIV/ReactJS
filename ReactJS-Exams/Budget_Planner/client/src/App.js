import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutAction } from './actions/authActions';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import YearlyPage from './components/Yearly/YearlyPage';
import MonthlyPage from './components/Monthly//MonthlyPage';
import ExpenseCreate from './components/Expense/ExpenseCreate';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <main>
                    <Switch>
                        <Route exact path="/" component={YearlyPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/plan/:year/:month/expense" component={ExpenseCreate} />
                        <Route path="/plan/:year/:month" component={MonthlyPage} />
                        <Route path="/plan/:year" component={YearlyPage} />
                    </Switch>
                </main>
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