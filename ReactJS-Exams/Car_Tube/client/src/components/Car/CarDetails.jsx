import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCarDetails, removeCar } from '../../api/remote';
import { toast } from 'react-toastify';

const carDetails = (props) => {
    const id = props.match.params['id'];
    const [isLoading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fuel, setFuel] = useState('');
    const [price, setPrice] = useState('');
    const [creator, setCreator] = useState('');
    const isOwner = sessionStorage.getItem('userId') === creator;

    useEffect(() => {
        getCarDetails(id).then((data) => {
            setTitle(data.title);
            setDescription(data.description);
            setBrand(data.brand);
            setModel(data.model);
            setYear(data.year);
            setImageUrl(data.imageUrl);
            setFuel(data.fuel);
            setPrice(data.price);
            setCreator(data._acl.creator);
            setLoading(false);
        });
    }, []);

    const removeCarHandler = () => {
        removeCar(id).then((json) => {
            if (!json.error) {
                toast.success('Listing deleted.');
                props.history.push('/car/all');
            }
        });
    };

    if (isLoading) {
        return (<h2>Loading...</h2>);
    }

    return (
        <div className="listing-details">
            <div className="my-listing-details">
                <p id="auto-title">{title}</p>
                <img src={imageUrl}/>
                <div className="listing-props">
                    <h2>Brand: {brand}</h2>
                    <h3>Model: {model}</h3>
                    <h3>Year: {year}</h3>
                    <h3>Fuel: {fuel}</h3>
                    <h3>Price: {price}$</h3>
                </div>
                {isOwner && <div className="listings-buttons">
                    <Link to={`/car/edit/${id}`} className="button-list">Edit</Link>
                    <a href="javascript:void(0)" onClick={removeCarHandler} className="button-list">Delete</a>
                </div>}
                <p id="description-title">Description:</p>
                <p id="description-para">{description}</p>
            </div>
        </div>
    );
};

export default withRouter(carDetails);