import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

function PrivateRoute(props) {
    if (!sessionStorage.getItem('authToken')) {
        toast.error('First you must login.');
        return <Redirect to="/login" />;
    }

    return (
        <Route {...props} />
    )
}

export default PrivateRoute;