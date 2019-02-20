import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { addNewExpensesAction } from '../../actions/expenseActions';
import Input from '../common/Input';
import validator from '../../validations/expenseCreate';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


export class ExpenseCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            category: 'Non-essential',
            amount: '',
            date: '',
            nameValidation: '',
            amountValidation: '',
            dateValidation: ''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
            [`${name}Validation`]: validator[name](value)
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { year, month } = this.props.match.params;
        const { name, category, amount, date, nameValidation, amountValidation, dateValidation } = this.state;
        if (nameValidation !== '' || amountValidation !== '' || dateValidation !== '') {
            toastr.error('Check for errors.');
            return;
        }

        this.props.addNewExpenses(year, month, {
            name,
            category,
            amount: Number(amount),
            date: Number(date)
        }).then(json => {
            if (json.success) {
                toastr.success('Added successful');
                this.props.history.push(`/plan/${year}/${month}`);
            } else {
                for (let error in json.errors) {
                    toastr.error(json.errors[error]);
                }
            }
        });

    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
            return;
        }

        const { name, amount, date } = this.state;
        this.setState({
            nameValidation: validator.name(name),
            amountValidation: validator.amount(amount),
            dateValidation: validator.date(date)
        });
    }

    render() {
        const year = Number(this.props.match.params.year);
        const month = Number(this.props.match.params.month);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Add Expenses</h1>
                        <h3>{monthNames[month - 1]} {year}</h3>
                    </div>
                </div>
                <div className="row space-top">
                    <div className="col-md-10">
                        <form onSubmit={this.onSubmitHandler}>
                            <legend>Add a new expense</legend>
                            <div className="form-group">
                                <Input
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeHandler}
                                    label="Name"
                                    validation={this.state.nameValidation}
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-md-2" htmlFor="category">Category:</label>
                                <select className="col-md-2 pl-2" name="category" value={this.state.category} onChange={this.onChangeHandler}>
                                    <option value="Non-essential">Non-essential</option>
                                    <option value="Fixed">Fixed</option>
                                    <option value="Variable">Variable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <Input
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={this.onChangeHandler}
                                    label="Cost"
                                    validation={this.state.amountValidation}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    name="date"
                                    value={this.state.date}
                                    onChange={this.onChangeHandler}
                                    label="Payment Date"
                                    validation={this.state.dateValidation}
                                />
                            </div>
                            <input type="submit" className="btn btn-secondary" value="Add" />
                        </form>
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
        addNewExpenses: (year, month, data) => dispatch(addNewExpensesAction(year, month, data)),
    };
}

export default withRouter(connect(mapState, mapDispatch)(ExpenseCreate));
