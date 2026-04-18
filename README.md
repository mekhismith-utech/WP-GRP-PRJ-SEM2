# Demon Core Animations - Web Programming Group Project

## Group Members
| Name            | Student ID |
|-----------------|------------|
| Mekhi Smith     | 2304381    |
| Tarique Levy    | 2401827    |
| Traciana Thompson| 2402168    |


---

## How to Run the Project

1. Extract the ZIP folder to your desktop.
2. Open the project folder in **Google Chrome** (required).
3. Open `DemonCoreAnimations.html` to start at the Home page.
4. To test the full flow:
   - Register a new account at `DemonCoreRegister.html`
   - Log in at `index.html`
   - Browse products at `product.html`
   - Add items to cart and view at `cart.html`
   - Checkout at `DemonCoreCheckout.html`
   - View your invoice at `invoice.html`
   - View analytics at `dashboard.html`
---

## Test Login Credentials

| Role  | TRN           | Password     |
|-------|---------------|--------------|
| Admin | 123-456-789   | PASSWORD123  |
| User  | Register your own via the Register page |

---

## Pages

| File                        | Purpose                          |
|-----------------------------|----------------------------------|
| `DemonCoreAnimations.html`  | Home / Landing Page              |
| `index.html`                | Login Page                       |
| `DemonCoreRegister.html`    | Registration Page                |
| `product.html`              | Product Catalogue (Shop)         |
| `cart.html`                 | Shopping Cart                    |
| `DemonCoreCheckout.html`    | Checkout Page                    |
| `invoice.html`              | Invoice Display                  |
| `dashboard.html`            | Analytics Dashboard              |
| `DemonCoreGallery.html`     | Gallery                          |
| `DemonCoreCommissions.html` | Commissions                      |
| `LoginError.html`           | Account Locked / Login Error     |
| `ViewerAnalytics.html`      | Admin Analytics (admin login)    |

---

## JavaScript Files

| File                | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| `DemonCoreAuth.js`  | Global auth state, logout, session management                  |
| `login.js`          | Login validation, 3-attempt lockout, password reset            |
| `register.js`       | Registration form validation, localStorage storage             |
| `products.js`       | Product array, AllProducts localStorage, dynamic rendering     |
| `cart.js`           | Cart display, quantity update, remove, totals                  |
| `checkout.js`       | Checkout form, order summary, invoice generation               |
| `invoice.js`        | Invoice page population from localStorage                      |
| `dashboard.js`      | ShowUserFrequency(), ShowInvoices(), GetUserInvoices()          |

---

## Frameworks & Tools Used

- **HTML5** - Semantic structure
- **CSS3** - Vanilla styling (Flexbox, Grid, CSS Variables, Media Queries)
- **JavaScript (ES6)** - All interactivity and data logic
- **localStorage** - Client-side persistent data storage
- **Google Fonts** - Outfit font family (`fonts.googleapis.com`)
- **Wireframing Tool(figma)** - Screenshots included in `/Wireframes/` folder

---

## localStorage Keys Used

| Key                | Contents                                      |
|--------------------|-----------------------------------------------|
| `RegistrationData` | Array of all registered user objects          |
| `AllProducts`      | Array of all product objects                  |
| `AllInvoices`      | Array of all invoices (all users)             |
| `currentUser`      | Currently logged-in user object               |
| `lastInvoice`      | Most recently generated invoice               |
| `loginClickCount`  | Admin analytics - login button click count    |
| `registerClickCount` | Admin analytics - register button click count |

---

