import React from 'react';
import { Link } from 'react-router-dom';

function Furniture(props) {
    const { image, description, model, make, deleteHandler, id } = props;

    return (
        <div className="col-md-4">
            <div className="card text-white bg-primary">
                <div className="card-body">
                    <blockquote className="card-blockquote">
                        <img src={image} />
                        <p>{description}</p>
                        <footer>
                            {model} created by {make}
                        </footer>
                        <div className="pull-right">
                            <Link to={`/furniture/details/${id}`} className="btn btn-info">Details</Link>
                            {deleteHandler && <a href="javascript:void(0)"
                                onClick={() => { deleteHandler(id); }} className="btn btn-danger">Delete Item</a>}
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Furniture;
