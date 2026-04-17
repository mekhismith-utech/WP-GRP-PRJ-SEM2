// Q5 & Q6: Checkout and Invoice Generation
// Loads cart from currentUser in localStorage, calculates totals
// On confirm: generates invoice, stores in AllInvoices and user's invoices[] in RegistrationData

// Q5: Load and display the cart summary from the current user's cart in localStorage
function loadOrderSummary() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        document.getElementById("order-summary-items").innerHTML = "<p style='color:#ef4444;'>Please log in to checkout.</p>";
        return;
    }

    let cart = currentUser.cart || [];

    if (cart.length === 0) {
        document.getElementById("order-summary-items").innerHTML = "<p style='color: var(--text-main);'>Your cart is empty. <a href='product.html' style='color:var(--accent-color);'>Go shopping</a></p>";
        return;
    }

    let itemsHTML = "";
    let subtotal = 0;

    // Q5: Display each cart item with name, quantity, and line price
    cart.forEach(function(item) {
        let lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        itemsHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.95rem;">
                <span style="color: var(--text-main);">${item.name} x${item.quantity}</span>
                <span style="font-weight: 600;">$${lineTotal.toFixed(2)}</span>
            </div>
        `;
    });

    // Q5: Calculate discount, tax, and total
    let discount = subtotal > 100 ? subtotal * 0.10 : 0;
    let tax = (subtotal - discount) * 0.15;
    let total = subtotal - discount + tax;

    document.getElementById("order-summary-items").innerHTML = itemsHTML;
    document.getElementById("summary-subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("summary-discount").innerText = "-$" + discount.toFixed(2);
    document.getElementById("summary-tax").innerText = "$" + tax.toFixed(2);
    document.getElementById("summary-total").innerText = "$" + total.toFixed(2);

    // Pre-fill the amount paid field with the total
    document.getElementById("amountPaid").value = total.toFixed(2);
}

// Q5 & Q6: Confirm checkout - validates form, generates invoice, clears cart
function confirmCheckout() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Please log in first.");
        window.location.href = "index.html";
        return;
    }

    let cart = currentUser.cart || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Q5: Collect shipping details from the form
    let name = document.getElementById("custName").value.trim();
    let email = document.getElementById("custEmail").value.trim();
    let address = document.getElementById("custAddress").value.trim();
    let city = document.getElementById("custCity").value.trim();
    let zip = document.getElementById("custZip").value.trim();
    let amountPaid = parseFloat(document.getElementById("amountPaid").value);

    if (!name || !email || !address || !city || !zip || isNaN(amountPaid)) {
        document.getElementById("checkout-error").innerText = "Please fill in all fields.";
        return;
    }

    document.getElementById("checkout-error").innerText = "";

    // Q5: Recalculate totals for invoice
    let subtotal = 0;
    cart.forEach(function(item) { subtotal += item.price * item.quantity; });
    let discount = subtotal > 100 ? subtotal * 0.10 : 0;
    let tax = (subtotal - discount) * 0.15;
    let total = subtotal - discount + tax;

    // Q6: Generate a unique invoice number using timestamp
    let invoiceNumber = "INV-" + Date.now().toString().slice(-8);

    // Q6: Build the invoice object with all required fields
    let invoice = {
        invoiceNumber: invoiceNumber,
        company: "Demon Core Animations",
        date: new Date().toLocaleDateString(),
        trn: currentUser.trn,
        customer: {
            name: name,
            email: email,
            address: address + ", " + city + ", " + zip
        },
        items: cart.map(function(item) {
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                lineTotal: (item.price * item.quantity).toFixed(2)
            };
        }),
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        amountPaid: amountPaid.toFixed(2)
    };

    // Q6: Append invoice to AllInvoices in localStorage (array of objects)
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    allInvoices.push(invoice);
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

    // Q6: Append invoice to the user's invoices[] inside RegistrationData
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let userIndex = users.findIndex(function(u) { return u.trn === currentUser.trn; });
    if (userIndex !== -1) {
        if (!Array.isArray(users[userIndex].invoices)) {
            users[userIndex].invoices = [];
        }
        users[userIndex].invoices.push(invoice);
        users[userIndex].cart = [];
        localStorage.setItem("RegistrationData", JSON.stringify(users));
    }

    // Q6: Clear the user's cart after checkout
    currentUser.cart = [];
    currentUser.invoices = currentUser.invoices || [];
    currentUser.invoices.push(invoice);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Q6: Store the last invoice for the invoice page to display
    localStorage.setItem("lastInvoice", JSON.stringify(invoice));

    // Q6: Optionally notify user their invoice has been "sent" to email
    alert("Order confirmed! Invoice " + invoiceNumber + " has been generated and sent to " + email + ".");

    // Redirect to invoice page
    window.location.href = "invoice.html";
}

// Load the order summary when the page loads
loadOrderSummary();
