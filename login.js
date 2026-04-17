//Adding an admin object to access the DASHBOARD page
const admin ={
    trn:"123-456-789",
    password:"PASSWORD123",

};


let attempts = 3;
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let trn = document.getElementById("trn").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("login-error");
   
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let user = users.find(u => u.trn === trn && u.password === password);

     //adding functionality to login to redirect to the viewer analytics page
    if (trn === admin.trn && password === admin.password) {
        alert("Admin Login successful!");
        window.location.href = "dashbaord.html";
        return;
    }

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Login successful!");
        window.location.href = "product.html"; 
    } else {
        attempts--;

        error.innerText = "Invalid login. Attempts left: " + attempts;

        if (attempts === 0) {
            window.location.href = "LoginError.html"; 
        }
    }
});



function resetPassword() {
    let trn = prompt("Enter your TRN:");

    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    let userIndex = users.findIndex(u => u.trn === trn);

    if (userIndex === -1) {
        alert("TRN not found!");
        return;
    }

   let trnPattern = /^\d{3}-\d{3}-\d{3}$/;
     if (!trnPattern.test(trn)) {
    error.innerText = "Invalid TRN format";
    return;
}
    let newPassword = prompt("Enter new password (min 8 characters):");

    if (!newPassword || newPassword.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("RegistrationData", JSON.stringify(users));

    alert("Password reset successful!");
}
