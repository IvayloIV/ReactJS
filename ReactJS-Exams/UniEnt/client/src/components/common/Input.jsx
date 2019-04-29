import React, { Component } from 'react';


export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label } = this.props;
        return (
            <div className="form-label-group">
                <input type={type} id={name} name={name} className="form-control" placeholder={label}
                    required="" onChange={onChange} value={value}/>
                <label htmlFor={name}>{label}</label>
            </div>
        );
    }
}
