const signupFormHandler = async (event) => {
    event.preventDefault();


    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmpassword = document.querySelector('#confirm-password-signup').value.trim();

    if (confirmpassword && email && password) {
        if (confirmpassword !== password) {
            return alert('Passwords dont match! :(');
        }
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ confirmpassword, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    } else {
        alert("Missing feilds")
    }
};


document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);