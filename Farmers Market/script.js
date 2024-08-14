
 function redirectToDashboard() {
    window.location.href = "index.html"; // Replace with the actual URL of the dashboard
 }

let cart = [];

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = page.id === pageId ? 'block' : 'none';
            });
        }

        function addToCart(product, price) {
            cart.push({ product, price });
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');
            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                cartItems.innerHTML += `<p>${item.product} - $${item.price.toFixed(2)}</p>`;
                total += item.price;
            });
            totalElement.textContent = total.toFixed(2);
        }

        function checkout() {
            alert('Checkout functionality is not implemented.');
        }

        function login() {
            alert('Login functionality is not implemented.');
        }

        function signUp() {
            alert('Sign Up functionality is not implemented.');
        }

        function authWith(provider) {
            alert(`Authentication with ${provider} is not implemented.`);
        }

        function addProduct() {
            alert('Add Product functionality is not implemented.');
        }

        function updateProduct() {
            alert('Update Product functionality is not implemented.');
        }

        function deleteProduct() {
            alert('Delete Product functionality is not implemented.');
        }
        
        //For the frontend to communicate with the backend//
        //To handle user-interactions//
        //Update products page script//
        async function fetchProducts() {
            const response = await fetch('http://localhost:3000/api/products');
            const products = await response.json();
            const productsContainer = document.getElementById('products');
            products.forEach(product => {
                productsContainer.innerHTML += `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                `;
            });
        }
    
        window.onload = fetchProducts;