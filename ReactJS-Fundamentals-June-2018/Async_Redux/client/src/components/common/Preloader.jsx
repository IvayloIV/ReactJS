import React from 'react';
import { connect } from 'react-redux';

const Preloader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="preloader">
            {loading && <p>Loading &hellip;</p>}
        </div>
    );
};

export default connect((state) => ({
    loading: state.ajaxCalls > 0
}))(Preloader);