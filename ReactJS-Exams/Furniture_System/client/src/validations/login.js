function email(value) {
    if (value === '') {
        return 'Email cannot be empty.';
    }

    if (value.indexOf('@') === -1) {
        return 'Invalid email.';
    }

    return '';
}

function password(value) {
    if (value === '') {
        return 'Password cannot be empty.';
    }

    if (value.length < 4) {
        return 'Password must be more than 4 symbols.';
    }

    return '';
}

export default (currentEmail, currentPassword) => {
    return {
        email: email(currentEmail),
        password: password(currentPassword)
    };
};