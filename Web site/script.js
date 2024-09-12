// script.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the default way
    
    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Example hardcoded credentials
    const correctUsername = 'user';
    const correctPassword = 'password123';
    
    // Simple validation
    if (username === correctUsername && password === correctPassword) {
        // Redirect to home page
        window.location.href = 'home.html';
    } else {
        // Display error message
        document.getElementById('error').innerText = 'Incorrect username or password';
    }
});
