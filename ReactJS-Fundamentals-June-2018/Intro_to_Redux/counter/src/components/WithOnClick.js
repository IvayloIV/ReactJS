import React from 'react';

const WithOnClick = (WrappedComponent) => {
    return class extends React.Component {
        onClicked = (event) => {
            this.props.actions[event.target.name](this.props.id);
        }

        render() {
            return (
                <WrappedComponent onClicked={this.onClicked} {...this.props}/>
            );
        }
    }
}

export default WithOnClick;
