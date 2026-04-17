

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// If no user is logged in, redirect to login page
if (!currentUser) {
    window.location.href = "index.html";
}

function displayCart() {// Get cart items from current user and display them
    let cart = currentUser.cart || [];
    let output = "";
    let subtotal = 0;
    // Loop through cart items and build HTML output
    cart.forEach((item, index) => {// Calculate sub-total for each item and add to overall subtotal
        let itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        output += `
            <div>
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <p>
                    Quantity:
                    <input type="number" value="${item.quantity}" min="1"
                    onchange="updateQuantity(${index}, this.value)">
                </p>
                <p>Sub-total: $${itemSubtotal.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
            <hr>
        `;// Build HTML for each cart item with name, price, quantity input, sub-total, and remove button
    });

    
    let discount = subtotal > 100 ? subtotal * 0.10 : 0;// Apply 10% discount if subtotal exceeds $100
    let tax = (subtotal - discount) * 0.15;// Calculate 15% tax on discounted subtotal
    let total = subtotal - discount + tax;// Calculate final total after applying discount and adding tax
    document.getElementById("cart-items").innerHTML = output;
    document.getElementById("cart-summary").innerHTML = `
        Subtotal: $${subtotal.toFixed(2)} <br>
        Discount: $${discount.toFixed(2)} <br>
        Tax (15%): $${tax.toFixed(2)} <br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;
}


function updateQuantity(index, qty) {// Update item quantity in cart
    currentUser.cart[index].quantity = parseInt(qty);
    saveUser();
    displayCart();
}


function removeItem(index) {// Remove item from cart
    currentUser.cart.splice(index, 1);
    saveUser();
    displayCart();
}


function clearCart() {// Clear all items from cart
    currentUser.cart = [];
    saveUser();
    displayCart();
}


function goCheckout() {// Redirect to checkout page
    window.location.href = "DemonCoreCheckout.html";
}


function closeCart() {// Redirect back to shop
    window.location.href = "DemonCoreShop.html";
}


function saveUser() {// Update current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let i = users.findIndex(u => u.trn === currentUser.trn);
    if (i !== -1) {
        users[i] = currentUser;
        localStorage.setItem("RegistrationData", JSON.stringify(users));
    }
}


displayCart();// Initial display of cart items when page loads