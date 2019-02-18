function make(value) {
    if (value === '') {
        return 'Make cannot be empty.';
    }

    if (value.length <= 3) {
        return 'Make must be more then 3 symbols long.';
    }

    return '';
}

function model(value) {
    if (value === '') {
        return 'Model cannot be empty.';
    }

    if (value.length <= 3) {
        return 'Model must be more then 3 symbols long.';
    }

    return '';
}

function year(value) {
    if (value === '') {
        return 'Year cannot be empty.';
    }

    if (isNaN(value)) {
        return 'Year must be a number.';
    }

    value = Number(value);
    if (value < 1950 || value > 2050) {
        return 'Year must be between 1950 and 2050.';
    }

    return '';
}

function description(value) {
    if (value === '') {
        return 'Description cannot be empty.';
    }

    if (value.length <= 10) {
        return 'Description must be more than 10 symbols.';
    }

    return '';
}

function price(value) {
    if (value === '') {
        return 'Price cannot be empty.';
    }

    if (isNaN(value)) {
        return 'Price must be a number.';
    }

    value = Number(value);
    if (value < 0) {
        return 'Price must be positive number.';
    }

    return '';
}

function image(value) {
    if (value === '') {
        return 'Image cannot be empty.';
    }

    if (!value.startsWith('http')) {
        return 'Image must start with http.';
    }

    return '';
}

export default function(currentMake, currentModel, currentYear, currentDescription, currentPrice, currentImage) {
    return {
        make: make(currentMake),
        model: model(currentModel),
        year: year(currentYear),
        description: description(currentDescription),
        price: price(currentPrice),
        image: image(currentImage),
    }
}