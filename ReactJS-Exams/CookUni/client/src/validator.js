import { toast } from 'react-toastify';

export default function(meal, ingredients, prepMethod, description, category, foodImageURL) {
    if (meal.length < 4) {
        toast.error('Meal should be at least 4 characters.');
        return false;
    }

    if (ingredients.length < 2) {
        toast.error('Ingredients should be at least 2.');
        return false;
    }

    if (prepMethod.length < 10) {
        toast.error('Preparation method should be at least 10 characters.');
        return false;
    }

    if (description.length < 10) {
        toast.error('Description method should be at least 10 characters.');
        return false;
    }

    if (category.length === 0) {
        toast.error('Select category.');
        return false;
    }

    if (!foodImageURL.startsWith('http://') && !foodImageURL.startsWith('https://')) {
        toast.error('Food image url should start with http:// or https://.');
        return false;
    }

    return true;
}
