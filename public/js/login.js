// THIS IS JUST COPIED CODE FROM THE ACTIVITIES
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

function startSignUp(event) {
  event.preventDefault();
  
  window.location.href = '/signUp';
};

function backToLogin(event) {
  event.preventDefault();
  
  window.location.href = '/login';
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  // TODO: Add logic for comparing password and confirm password inputs if there is time
  // const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('#show-signup-form').addEventListener('click', startSignUp);
});

