// Main JavaScript for Blackcode Store

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Blackcode Store loaded successfully');
    
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Handle add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
    
    // Load cart items on checkout page
    if (window.location.pathname.includes('checkout.html')) {
        loadCartItems();
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Handle payment form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your purchase! Your order has been placed.');
            // Clear the cart after purchase
            localStorage.setItem('cart', JSON.stringify([]));
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
});

// Function to add item to cart
function addToCart(productId) {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Find the product in our "database"
    const product = getProductById(productId);
    
    if (product) {
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        // Save updated cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show success message
        alert(`${product.name} has been added to your cart!`);
    }
}

// Function to load cart items on checkout page
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${item.price} × ${item.quantity}</p>
            </div>
            <div class="item-total">$${itemTotal.toFixed(2)}</div>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Mock product database (in a real app, this would come from a server)
function getProductById(id) {
    const products = {
        '1': {
            name: 'Laptop Pro X1',
            price: '$999.99'
        },
        '2': {
            name: 'Gaming Beast Z7',
            price: '$1,299.99'
        },
        '3': {
            name: 'Ultrabook Slim',
            price: '$799.99'
        },
        '4': {
            name: 'Professional Workstation',
            price: '$1,599.99'
        }
    };
    
    return products[id] || null;
}

//hii nitaweka baadae - Additional features to implement later:
// 1. Product search functionality
// 2. User account system
// 3. Product reviews and ratings
// 4. Order tracking
// 5. Wishlist feature