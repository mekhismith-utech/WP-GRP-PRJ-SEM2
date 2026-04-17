// Q2: Product Catalogue - Array of product objects
// Each product has: id, name, price, description, and image URL
const defaultProducts = [
    {
        id: 1,
        name: "Poster",
        price: 25,
        description: "High quality posters of your favourite characters. Can be done traditionally or digitally to your liking.",
        image: "poster.png.jpeg"
    },
    {
        id: 2,
        name: "Portrait",
        price: 15,
        description: "Freshly drawn portraits done whether in an anime or realistic style. Can be done traditionally or digitally to your liking.",
        image: "portrait.png.jpeg"
    },
    {
        id: 3,
        name: "Character Design",
        price: 30,
        description: "Character designs done right to specifications. Can be done traditionally or digitally to your liking.",
        image: "joke.png.jpeg"
    },
    {
        id: 4,
        name: "Logo",
        price: 10,
        description: "Professionally made logos for your brand or business. Can be done traditionally or digitally to your liking.",
        image: "Logo.png.jpeg"
    }
];

//Store products in localStorage as AllProducts on first load
function initProducts() {
    if (!localStorage.getItem("AllProducts")) {
        localStorage.setItem("AllProducts", JSON.stringify(defaultProducts));
    }
}

//Retrieve products from localStorage and display them dynamically using innerHTML
function displayProducts() {
    initProducts();

    //Retrieve AllProducts from localStorage using JSON.parse()
    let products = JSON.parse(localStorage.getItem("AllProducts"));

    let grid = document.getElementById("product-grid");
    let output = "";

    //Loop through product array and build HTML cards dynamically
    products.forEach(function(product) {
        output += `
            <div class="card shop-card">
                <h3>${product.name}</h3>
                <img class="store-temp" src="${product.image}" alt="${product.name}">
                <div class="price">$${product.price}</div>
                <p style="margin-bottom: 2rem; color: var(--text-main); font-size: 0.9rem;">${product.description}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });

    //Inject product HTML into the DOM using innerHTML
    grid.innerHTML = output;
}

// Q3: Add to Cart - adds selected product to the current logged-in user's cart in localStorage
//and also saves the cart back to RegistrationData so the user's cart is persistent
function addToCart(productId) {
    // Checks if a user is logged in
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Please log in to add items to your cart.");
        window.location.href = "index.html";
        return;
    }

    //Retrieve product details from AllProducts in localStorage
    let products = JSON.parse(localStorage.getItem("AllProducts"));
    let product = products.find(function(p) { return p.id === productId; });

    if (!product) return;

    //Ensure cart is an array
    if (!Array.isArray(currentUser.cart)) {
        currentUser.cart = [];
    }

    //Check if item already in cart - if so, increase quantity
    let existingItem = currentUser.cart.find(function(item) { return item.id === productId; });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        //Add new item to cart with a defaault quantity 1
        currentUser.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    //Save updated user back to localStorage as currentUser
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Also updates the user record inside RegistrationData
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let userIndex = users.findIndex(function(u) { return u.trn === currentUser.trn; });
    if (userIndex !== -1) {
        users[userIndex].cart = currentUser.cart;
        localStorage.setItem("RegistrationData", JSON.stringify(users));
    }

    alert(product.name + " added to cart!");
}

// Run on page load
displayProducts();
