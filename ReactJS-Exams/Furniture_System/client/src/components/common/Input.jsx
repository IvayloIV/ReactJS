import React, { Component } from 'react';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label, validation } = this.props;
        return (
            <div>
                <label htmlFor="new-email">{label}</label>
                <input
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} 
                    className={'form-control' + (validation === '' ? ' is-valid' : ' is-invalid')}    
                />
                <div className="form-control-feedback">{validation}</div>
            </div>
        );
    }
}