function name(value) {
    if (value === '') {
        return 'Username must be not empty.';
    }

    return '';
}

function email(value) {
    if (value === '') {
        return 'Email must be not empty.';
    }

    return '';
}

function password(value, repeat) {
    if (value === '') {
        return 'Password must be not empty.';
    }

    if (value.length < 4) {
        return 'Password must be more then 4 symbols.';
    }

    if (value !== repeat) {
        return 'Passwords must match.';
    }

    return '';
}

function repeat(value, password) {
    if (value === '') {
        return 'Repeat password must be not empty.';
    }

    if (value.length < 4) {
        return 'Repeat password must be more then 4 symbols.';
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
    }
}