import React, { Component } from 'react';

export class Expenses extends Component {
    render() {
        const data = [];
        for (let expense of this.props.expenses) {
            const { name, category, amount, date, id } = expense;
            data.push(
                <tr key={id}>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{amount.toFixed(2)}</td>
                    <td>{date}</td>
                    <td>
                        <a href="javascript:void(0)" onClick={() => this.props.onClickHandler(id)} className="btn btn-secondary">Delete</a>
                    </td>
                </tr>
            );
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Cost</th>
                        <th>Payment Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        )
    }
}

export default Expenses;
