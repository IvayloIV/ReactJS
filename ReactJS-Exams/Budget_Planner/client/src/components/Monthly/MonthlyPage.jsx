import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { budgetPlanerAction, updateBudgetAction, removeExpenseAction } from '../../actions/expenseActions';
import PlannerForm from './PlannerForm';
import Expenses from './Expenses';
const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];

export class MonthlyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            income: '',
            budget: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickHandler(id) {
        this.props.removeExpense(id).then(() => {
            toastr.success('Removed success.');
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const year = Number(this.props.match.params.year);
        const month = Number(this.props.match.params.month);
        const income = Number(this.state.income);
        const budget = Number(this.state.budget);
        if (income < 0 || budget < 0) {
            toastr.error('Income and budget must be a positive numbers.');
            return;
        }

        this.props.updateBudget(year, month, income, budget);
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const month = Number(this.props.match.params.month);
        const year = Number(this.props.match.params.year);
        this.props.budgetPlaner(year, month).then(() => {
            this.setState({
                income: this.props.expense.income,
                budget: this.props.expense.budget
            });
        });
    }

    render() {
        const { income, budget } = this.state;
        const year = this.props.match.params.year;
        const month = this.props.match.params.month;

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Budget Planner</h1>
                    </div>
                </div>
                <div className="row space-top ">
                    <div className="col-md-12 ">
                        <div className="card bg-secondary">
                            <div className="card-body">
                                <blockquote className="card-blockquote">
                                    <h2 id="month">{monthNames[Number(month) - 1]} {year}</h2>
                                    <div className="row">
                                        <div className="col-md-3 space-top">
                                            <h4>Planner</h4>
                                            <PlannerForm
                                                income={income} 
                                                budget={budget} 
                                                onChangeHandler={this.onChangeHandler}
                                                onSubmitHandler={this.onSubmitHandler}
                                            />
                                        </div>
                                        <div className="col-md-8 space-top">
                                            <div className="row">
                                                <h4 className="col-md-9">Expenses</h4>
                                                <Link to={`/plan/${year}/${month}/expense`} className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                            </div>
                                            {this.props.expense.expenses && <Expenses expenses={this.props.expense.expenses} onClickHandler={this.onClickHandler}/>}
                                        </div>
                                    </div>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        expense: state.expense
    };
}

function mapDispatch(dispatch) {
    return {
        budgetPlaner: (year, month) => dispatch(budgetPlanerAction(year, month)),
        updateBudget: (year, month, income, budget) => dispatch(updateBudgetAction(year, month, income, budget)),
        removeExpense: (id) => dispatch(removeExpenseAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(MonthlyPage));
