function name(value) {
    if (value === '') {
        return 'Name cannot be empty.';
    }

    if (value.length < 4) {
        return 'Name must be more then 4 symbols.';
    }

    return '';
}

function email(value) {
    if (value === '') {
        return 'Email cannot be empty.';
    }

    if (value.indexOf('@') === -1) {
        return 'Invalid email.';
    }

    return '';
}

function password(value, repeatPass) {
    if (value === '') {
        return 'Password cannot be empty.';
    }

    if (value.length < 4) {
        return 'Password must be more than 4 symbols.';
    }

    if (value !== repeatPass) {
        return 'Passwords must match.';
    }

    return '';
}

function repeat(value, password) {
    if (value === '') {
        return 'Repeat password cannot be empty.';
    }

    if (value.length < 4) {
        return 'Repeat password must be more than 4 symbols.';
    }

    if (value !== password) {
        return 'Passwords must match.';
    }

    return '';
}

export default (currentName, currentEmail, currentPassword, currentRepeat) => {
    return {
        name: name(currentName),
        email: email(currentEmail),
        password: password(currentPassword, currentRepeat),
        repeat: repeat(currentRepeat, currentPassword)
    };
};