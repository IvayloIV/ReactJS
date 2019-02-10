import React from 'react';

class BoundFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = setInitialState(this.props.children);
    }

    onChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmitted = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitted}>
                {React.Children.map(this.props.children, child => {
                    if (child.type === 'input' && child.props.name) {
                        return React.cloneElement(child, {
                            onChange: this.onChanged,
                            value: this.state[child.props.name]
                        });
                    }

                    return child;
                })}
            </form>
        );
    }
}

function setInitialState(children) {
    let state = {};

    React.Children.map(children, child => {
        if (child.type === 'input' && child.props.name) {
            state[child.props.name] = '';
        }
    });

    return state;
}

export default BoundFrom;
