import React from 'react';

const Input = ({ name, type = 'text', value, onChange, label }) => {
    return (
        <div>
            <p>{label}</p>
            <input
                type={type}
                placeholder={label}
                className={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
