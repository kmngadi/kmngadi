document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        // You can replace this with actual form submission logic (e.g., sending data to a server)
        document.getElementById('responseMessage').innerText = 'Thank you for contacting us, ' + name + '! We will get back to you soon.';
        document.getElementById('contactForm').reset(); // Reset form fields
    } else {
        document.getElementById('responseMessage').innerText = 'Please fill out all fields.';
    }
});
