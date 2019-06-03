import { toast } from 'react-toastify';

const validator = (title, description, brand, model, fuel, year, price, imageUrl) => {
    if (title.length > 33) {
        toast.error('The title length must not exceed 33 characters!');
        return false;
    }

    if (description.length < 30 || description.length > 450) {
        toast.error('The description length must not exceed 450 characters and should be at least 30!');
        return false;
    }

    if (brand.length > 11) {
        toast.error('The brand length must not exceed 11 characters!');
        return false;
    }

    if (model.length > 11) {
        toast.error('The model length must not exceed 11 characters!');
        return false;
    }

    if (model.length < 4) {
        toast.error('The model length should be at least 4 characters!');
        return false;
    }

    if (fuel.length > 11) {
        toast.error('The fuelType length must not exceed 11 characters!');
        return false;
    }

    if (year.length !== 4) {
        toast.error('The year must be only 4 chars long!');
        return false;
    }

    if (price > 1000000) {
        toast.error('The maximum price is 1000000$');
        return false;
    }

    if (!imageUrl.startsWith('http')) {
        toast.error('Link url should always start with "http".');
        return false;
    }

    return true;
};

export default validator;