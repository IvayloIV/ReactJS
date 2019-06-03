import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../common/Input';
import { createCar } from '../../api/remote';
import validator from '../../validations/validator';

const CreateCar = (props) => {
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
        createCar(seller, title, description, imageUrl, brand, model, fuel, year, price)
            .then((json) => {
                if (!json.error) {
                    toast.success('Car created.');
                    props.history.push('/car/all');
                } else {
                    toast.error(json.description);
                }
            });
    };

    return (
        <div id="create-listing">
            <form onSubmit={submitHandler}>
                <div className="container">
                    <h1>Create Car Listing</h1>
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
                    <button type="submit" className="registerbtn">Create Listing</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(CreateCar);