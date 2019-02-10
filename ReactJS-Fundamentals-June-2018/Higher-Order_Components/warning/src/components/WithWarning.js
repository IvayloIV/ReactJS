import React from 'react';

const WithWarning = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div className="alert">
                    <span className="alert-symbol">&#9888;</span>
                    <WrappedComponent {...this.props}/>
                </div>
            );
        }
    }
}

export default WithWarning;