
document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();
    // Clear previous error message
    let error = document.getElementById("reg-error");
    error.innerText = "";

    // Retrieve form values
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let trn = document.getElementById("trn").value;
    let password = document.getElementById("password").value;

    // Basic validation
    if (password.length < 8) {
        error.innerText = "Password must be at least 8 characters.";
        return;
    }

    // Age validation
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Check if user is at least 18 years old
    if (age < 18) {
        error.innerText = "You must be 18 or older.";
        return;
    }

    // TRN format validation (simple regex for 000-000-000)
    let trnPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!trnPattern.test(trn)) {
        error.innerText = "TRN must be in format 000-000-000.";
        return;
    }

    // Check for duplicate TRN
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    // Check if TRN already exists in RegistrationData
    if (users.find(u => u.trn === trn)) {
        error.innerText = "TRN already exists.";
        return;
    }

    // Create new user object and save to localStorage
    let newUser = {
        fname: fname,
        lname: lname,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        trn: trn,
        password: password,
        dateRegistered: new Date(),
        cart: [],
        invoices: []
    };

    // Save new user to RegistrationData in localStorage
    users.push(newUser);
    localStorage.setItem("RegistrationData", JSON.stringify(users));

    alert("Registration successful!");

    // Redirect to login page after successful registration
    window.location.href = "index.html";
});