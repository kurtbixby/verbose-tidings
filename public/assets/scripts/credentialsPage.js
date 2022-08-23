async function formSubmission(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    console.log(email, password);

    if (location.pathname.includes('signup')) {
        const username = form.querySelector('#username').value;

        if (!(email && username && password)) {
            // Fail
        } else {
            await signUp(email, username, password);
        }
    } else if (location.pathname.includes('login')) {
        if (!(email && password)) {
            // Fail
        } else {
            await login(email, password);
        }
    }
}

// ADD BETTER PATHWAYS FOR FAILED LOGIN/SIGNUP

async function signUp(email, username, password) {
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = '/postsignup';
        } else {
            console.error(response.json());
            window.location.replace('/');
        }

    } catch (err) {
        console.error(err);
    }
}

async function login(email, password) {
    console.log('login');
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            redirect: "manual"
        });

        console.log(response);

        if (response.ok) {
            window.location.href = '/';
        } else {
            console.log('response not okay');
            console.error(response.json());
            window.location.replace('/');
        }

    } catch (err) {
        console.error(err);
    }
}

document.querySelector('form').addEventListener('submit', formSubmission);