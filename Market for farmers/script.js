// Add event listeners for buttons
let login = document.getElementById('login');
let signup = document.getElementById('signup');

// Event listener for the Login button
login.addEventListener('click', () => {
    location.href = './login/index.html'; // Redirect to the login page
});

// Event listener for the Signup button
signup.addEventListener('click', () => {
    location.href = './signup/index.html'; // Redirect to the signup page
});
