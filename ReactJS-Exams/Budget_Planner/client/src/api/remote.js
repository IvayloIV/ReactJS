const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    return await res.json();
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return await res.json();
}

async function planByYear(year) {
    const res = await fetch(host + 'plan/' + year, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function defaultPlan() {
    const res = await fetch(host + 'yearly/current', {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function budgetPlaner(year, month) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

async function updateBudget(year, month, body) {
    const res = await fetch(host + `plan/${year}/${month}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function addNewExpenses(year, month, body) {
    const res = await fetch(host + `plan/${year}/${month}/expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify(body)
    });
    return await res.json();
}

async function removeExpense(expenseId) {
    const res = await fetch(host + `plan/expense/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        }
    });
    return await res.json();
}

export { register, login, planByYear, defaultPlan, budgetPlaner, updateBudget, addNewExpenses, removeExpense };