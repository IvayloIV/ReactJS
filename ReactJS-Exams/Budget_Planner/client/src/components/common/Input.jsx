import React, { Component } from 'react';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, validation } = this.props;
        return (
            <div className={`form-group${validation === '' ? ' has-success' : ' has-danger'}`}>
                <label htmlFor="new-email">{label}</label>
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value}
                    className={`form-control${validation === '' ? ' is-valid' : ' is-invalid'}`}
                />
                {validation !== '' ? <div className="form-control-feedback">{validation}</div> : null}
            </div>
        );
    }
}