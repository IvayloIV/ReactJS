import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCars, removeCar } from '../../api/remote';
import CarCard from './CarCard';

const ListCars = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        getAllCars().then((allCars) => {
            setCars(allCars);
            setLoading(false);
        })
    }, []);

    const removeCarHandler = (carId) => {
        removeCar(carId).then((json) => {
            if (!json.error) {
                setCars(cars.filter(a => a._id !== carId));
                toast.success('Listing deleted.');
            }
        });
    };

    if (isLoading) {
        return (<h2>Loading...</h2>);
    }

    return (
        <div id="car-listings">
            <h1>Car Listings</h1>

            <div id="listings">
                {cars.length > 0 ? cars.map(c => {
                    const isOwner = userId === c._acl.creator;
                    return (<CarCard {...c} isOwner={isOwner} key={c._id} removeCarHandler={removeCarHandler} />);
                }) : <p className="no-cars">No cars in database.</p>}
            </div>
        </div>
    );
};

export default ListCars;