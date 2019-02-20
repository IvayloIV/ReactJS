function name(value) {
    if (value === '') {
        return 'Name must be not empty.';
    }

    return '';
}

function amount(value) {
    if (value === '') {
        return 'Cost must be not empty.';
    }
    
    if (isNaN(value)) {
        return 'Cost must be a number.';
    }

    if (Number(value) < 0) {
        return 'Cost must be a positive number';
    }

    return '';
}

function date(value) {
    if (value === '') {
        return 'Date must be not empty.';
    }
    
    if (isNaN(value)) {
        return 'Date must be a number.';
    }

    if (Number(value) < 0) {
        return 'Date must be a positive number';
    }

    return '';
}

export default {name, amount, date};