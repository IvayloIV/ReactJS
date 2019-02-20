function email(value) {
    if (value === '') {
        return 'Email must be not empty.';
    }

    return '';
}

function password(value) {
    if (value === '') {
        return 'Password must be not empty.';
    }

    if (value.length < 4) {
        return 'Password must be more then 4 symbols.';
    }

    return '';
}

export default { email, password };
