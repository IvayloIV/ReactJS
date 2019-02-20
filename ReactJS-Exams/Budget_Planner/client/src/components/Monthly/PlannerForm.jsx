import React, { Component } from 'react';

export class PlannerForm extends Component {
    render() {
        const { onChangeHandler, onSubmitHandler, income, budget } = this.props;

        return (
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="income">Income:</label>
                    <input className="form-control" value={income} onChange={onChangeHandler} name="income" type="number" />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="budget">Budget:</label>
                    <input className="form-control" value={budget} onChange={onChangeHandler} name="budget" type="number" />
                </div>
                <input type="submit" className="btn btn-secondary" value="Save" />
            </form>
        )
    }
}

export default PlannerForm;
