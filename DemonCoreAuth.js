//Event Handling: At least two working event listeners
document.addEventListener('DOMContentLoaded', () => {

    //DOM Manipulation: Correct use of DOM functions
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const regError = document.getElementById('reg-error');

    // Display analytics if on ViewerAnalytics page
    const registerClicksDisplay = document.getElementById('register-clicks');
    const loginClicksDisplay = document.getElementById('login-clicks');

    if (registerClicksDisplay) {
        registerClicksDisplay.textContent = localStorage.getItem('registerClickCount') || '0';
    }
    if (loginClicksDisplay) {
        loginClicksDisplay.textContent = localStorage.getItem('loginClickCount') || '0';
    }

    // Handle Registration
    if (registerForm) {
        const regBtn = registerForm.querySelector('button[type="submit"]');
        if (regBtn) {
            regBtn.addEventListener('click', () => {
                let count = parseInt(localStorage.getItem('registerClickCount') || '0', 10);
                localStorage.setItem('registerClickCount', count + 1);
            });
        }

        //Event Handling: Event Handler #1
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const name = registerForm.elements['name'].value;
            const dob = registerForm.elements['dob'].value;
            const email = registerForm.elements['email'].value;
            const username = registerForm.elements['reg_username'].value;
            const password = registerForm.elements['reg_password'].value;

            // Event Handling: Form Validation / Input Handling: Simple validation (check if empty)
            if (name === "" || dob === "" || email === "" || username === "" || password === "") {
                //DOM Manipulation: Dynamically update HTML and CSS using Js
                // Event Handling: Form Validation / Input Handling: updates the DOM with error messages
                regError.innerHTML = "All fields are required!";
                regError.style.display = "block";
                return;
            }

            // Event Handling: Form Validation / Input Handling: validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            //age verification
            const dob = new Date(registerForm.elements['dob'].value);
            const age = new Date().getFullYear() - dob.getFullYear();
            if (age < 18) { alert("Must be 18+"); return; }

            // Event Handling: Basic Interactivity / Logic: Evidence of correct control structures (if statement)
            if (!emailRegex.test(email)) {
                regError.innerHTML = "Please enter a valid email format.";
                regError.style.display = "block";
                return;
            }

            let users = JSON.parse(localStorage.getItem('demonCoreUsers')) || [];

            if (users.some(u => u.username === username)) {
                regError.innerHTML = "Username already exists! Please choose another.";
                regError.style.display = "block";
                return;
            }

            // Hide error if successful
            regError.style.display = "none";

            // Save new user profile
            const newUser = { name, dob, email, username, password };
            users.push(newUser);
            localStorage.setItem('demonCoreUsers', JSON.stringify(users));

            alert('Registration successful! You can now log in.');
            registerForm.reset();
        });
    }

    // Handle Login
    if (loginForm) {
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                let count = parseInt(localStorage.getItem('loginClickCount') || '0', 10);
                localStorage.setItem('loginClickCount', count + 1);
            });
        }

        //Event Handling: Event Handler #2
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const username = loginForm.elements['username'].value;
            const password = loginForm.elements['password'].value;

            // Event Handling: Form Validation / Input Handling: Simple validation (check if empty)
            if (username === "" || password === "") {
                loginError.innerHTML = "Username and password cannot be empty.";
                loginError.style.display = "block";
                return;
            }
           
            // Get existing users
            let users = JSON.parse(localStorage.getItem('demonCoreUsers')) || [];

            // Authenticate by checking if user matches
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                loginError.style.display = "none";
                alert(`Welcome back, ${user.name}! Login successful.`);
                
                // Save current session mapping active user
                localStorage.setItem('demonCoreSession', JSON.stringify({ username: user.username, name: user.name }));
                
                window.location.reload();
            } else {
                // Event Handling: Form Validation / Input Handling: updates the DOM with error messages
                loginError.innerHTML = "Invalid username or password.";
                loginError.style.display = "block";
            }
        });
    }

    // Handle Logout and UI state globally
    const logoutBtn = document.getElementById('logout-btn');
    const logoutItem = document.getElementById('logout-item');
    
    // Check if user is logged in to toggle logout button visibility
    if (localStorage.getItem('demonCoreSession') && logoutItem) {
        logoutItem.style.display = 'inline-block';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('demonCoreSession');
            alert('You have been logged out safely.');
            window.location.href = 'DemonCoreAnimations.html';
        });
    }

    // --- Checkout Logic (Combined) ---
    // Event Handling: DOM Manipulation: Correct use of DOM functions
    const qtyInput = document.getElementById('asset-quantity');
    const qtyDisplay = document.getElementById('qty-display');
    const assetPriceDisplay = document.getElementById('asset-price');
    const totalPriceDisplay = document.getElementById('total-price');

    const basePrice = 20.00;
    const serviceFee = 1.50;

    if (qtyInput) {
        //Event Handling: Respective handler for input change (Calculate dynamically continuously)
        qtyInput.addEventListener('input', (e) => {
            let qty = parseInt(e.target.value);
            
            // Event Handling: Form Validation / Input Handling: Simple validation for number input
            // Event Handling: Basic Interactivity / Logic: Evidence of correct control structures being used
            if (isNaN(qty) || qty < 1) {
                qty = 1; // Fallback to 1 if user tries to enter negatives or backspace entirely
            }

            // Event Handling: Basic Interactivity / Logic: Correct arithmetic calculations
            const subtotal = basePrice * qty;
            const total = subtotal + serviceFee;

            // Event Handling: DOM Manipulation: Dynamically update HTML and CSS using Js
            if (qtyDisplay) qtyDisplay.innerHTML = qty;
            if (assetPriceDisplay) assetPriceDisplay.innerHTML = subtotal.toFixed(2);
            if (totalPriceDisplay) totalPriceDisplay.innerHTML = total.toFixed(2);
        });
    }
});
