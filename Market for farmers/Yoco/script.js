document.getElementById("yoco-button").onclick = function (e) {
    // Ensure that the Yoco script is loaded
    if (!window.YocoCheckout) {
      console.error('YocoCheckout script not loaded.');
      return;
    }
  
    // Configuration options for Yoco Checkout
    var options = {
      key: 'YOUR_YOCO_API_KEY', // Replace with your Yoco API key
      amount: Math.round(localStorage.getItem('sum') * 100), // Amount in cents
      currency: 'ZAR', // Yoco supports South African Rand (ZAR)
      description: 'This is your order',
      name: 'MyShop Checkout',
      image: 'https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg',
      handler: function(response) {
        console.log('Payment Successful:', response);
        // Handle successful payment
        // You might want to redirect the user to a success page or display a message
        alert('Payment successful! Your order has been placed.');
        localStorage.removeItem('cart'); // Clear the cart from localStorage
        window.location.href = '../success.html'; // Redirect to success page
      },
      prefill: {
        name: '', // Optional: Pre-fill customer name
        email: '', // Optional: Pre-fill customer email
        contact: '' // Optional: Pre-fill customer contact number
      },
      theme: {
        color: '#000' // Custom theme color
      }
    };
  
    // Initialize and open Yoco Checkout
    var yoco = new YocoCheckout(options);
    yoco.open();
  
    // Prevent default form submission behavior
    e.preventDefault();
  };
  