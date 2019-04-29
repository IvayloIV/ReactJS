import React from 'react';
import { Link } from 'react-router-dom';

function EmptyList() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div id="fouronefour">
            <img className="no-found-picture" src="./images/404face.png" />
          </div>
          <div className="error-template">
            <h1>
              Oops!</h1>
            <h2>
              404 Not Found</h2>
            <div className="error-details">
              UniEnt cannot find any event...
          </div>
            <div className="actions">
              <Link to="/event/create" className="btn btn-dark btn-lg">Create the first one? </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyList;
