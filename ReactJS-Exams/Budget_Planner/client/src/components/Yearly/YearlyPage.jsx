import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { planPerYearAction, defaultPlanAction } from '../../actions/balanceActions';
import PlanCard from './PlanList';

class YearlyPage extends Component {
    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
            return;
        }
        
        this.updateBalance();
    }

    updateBalance() {
        if (!this.props.match.params.year) {
            this.props.defaultPlan();
            return;
        }

        this.props.planPerYear(this.props.match.params.year);
    }

    render() {
        const year = this.props.match.params.year || (new Date()).getFullYear();

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Yearly Balance</h1>
                    </div>
                </div>
                <PlanCard plans={this.props.balance}  year={year} />
            </div>
        );
    }
}

function mapState(state) {
    return {
        balance: state.balance,
        expense: state.expense
    };
}

function mapDispatch(dispatch) {
    return {
        planPerYear: (year) => dispatch(planPerYearAction(year)),
        defaultPlan: () => dispatch(defaultPlanAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(YearlyPage));