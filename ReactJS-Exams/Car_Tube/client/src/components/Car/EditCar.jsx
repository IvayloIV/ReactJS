import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { getCarDetails, editCar } from '../../api/remote';
import validator from '../../validations/validator';

const EditCar = (props) => {
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

    const submitHandler = (e) => {
        e.preventDefault();

        const isValid = validator(title, description, brand, model, fuel, year, price, imageUrl);
        if (!isValid) {
            return;
        }

        const seller = sessionStorage.getItem('username');
        editCar(id, seller, title, description, imageUrl, brand, model, fuel, year, price)
            .then((json) => {
                if (!json.error) {
                    toast.success(`Listing ${title} updated.`);
                    props.history.push(`/car/details/${id}`);
                } else {
                    toast.error(json.description);
                }
            });
    };

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
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return (<h2>Loading...</h2>);
    }

    return (
        <div id="edit-listing">
            <form onSubmit={submitHandler}>
                <div className="container">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr />

                    <Input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Title"
                    />
                    <Input
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Description"
                    />
                    <Input
                        name="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        label="Brand"
                    />
                    <Input
                        name="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        label="Model"
                    />
                    <Input
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        label="Year"
                    />
                    <Input
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        label="Image Url"
                    />
                    <Input
                        name="fuel"
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        label="Fuel"
                    />
                    <Input
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        label="Price"
                    />

                    <hr />
                    <button type="submit" className="registerbtn">Edit Listing</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(EditCar);