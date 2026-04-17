// Q7: Dashboard Functions
// ShowUserFrequency() - displays frequency bar charts for gender and age group
// ShowInvoices()      - displays all invoices from AllInvoices, searchable by TRN
// GetUserInvoices()   - displays all invoices for the currently logged-in user from RegistrationData


function ShowUserFrequency() {
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

    //Count users by gender
    let genderCount = { Male: 0, Female: 0, Other: 0 };

    //Count users by age group
    let ageCount = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    users.forEach(function(user) {
        //  Count gender categories
        if (genderCount.hasOwnProperty(user.gender)) {
            genderCount[user.gender]++;
        } else {
            genderCount["Other"]++;
        }

        //Calculate age from date of birth using JavaScript
        let today = new Date();
        let birthDate = new Date(user.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        //Assign to correct age group
        if (age >= 18 && age <= 25) {
            ageCount["18-25"]++;
        } else if (age >= 26 && age <= 35) {
            ageCount["26-35"]++;
        } else if (age >= 36 && age <= 50) {
            ageCount["36-50"]++;
        } else if (age > 50) {
            ageCount["50+"]++;
        }
    });

    let totalUsers = users.length || 1; // avoid divide by zero

    //Count users by gender
    let genderHTML = "";
    Object.keys(genderCount).forEach(function(gender) {
        let count = genderCount[gender];
        let widthPct = Math.round((count / totalUsers) * 100);
        genderHTML += `
            <div class="bar-label">${gender}</div>
            <div class="bar-row">
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${widthPct}%;"></div>
                </div>
                <span class="bar-count">${count}</span>
            </div>
        `;
    });

    if (users.length === 0) {
        genderHTML = "<p style='color: var(--text-main);'>No registered users yet.</p>";
    }

    document.getElementById("gender-chart").innerHTML = genderHTML;

    //Count users by age group
    let ageHTML = "";
    Object.keys(ageCount).forEach(function(group) {
        let count = ageCount[group];
        let widthPct = Math.round((count / totalUsers) * 100);
        ageHTML += `
            <div class="bar-label">${group} years</div>
            <div class="bar-row">
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${widthPct}%;"></div>
                </div>
                <span class="bar-count">${count}</span>
            </div>
        `;
    });

    if (users.length === 0) {
        ageHTML = "<p style='color: var(--text-main);'>No registered users yet.</p>";
    }

    document.getElementById("age-chart").innerHTML = ageHTML;
}

// ============================================================
// Q7b: ShowInvoices()
// Displays all invoices from AllInvoices, with optional TRN search filter
// ============================================================
function ShowInvoices(filterTRN) {
    //Retrieve AllInvoices from localStorage using JSON.parse()
    let allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];

    //og all invoices to console as required by the assignment
    console.log("=== ShowInvoices() ===");
    console.log(allInvoices);

    let list = allInvoices;

    //Filter by TRN if a search term was provided
    if (filterTRN && filterTRN.trim() !== "") {
        list = allInvoices.filter(function(inv) {
            return inv.trn === filterTRN.trim();
        });
    }

    let invoiceListDiv = document.getElementById("invoice-list");

    if (list.length === 0) {
        invoiceListDiv.innerHTML = "<p style='color: var(--text-main);'>No invoices found" + (filterTRN ? " for TRN: " + filterTRN : "") + ".</p>";
        return;
    }

    let html = "";
    list.forEach(function(inv) {
        html += `
            <div class="invoice-row">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                        <strong>${inv.invoiceNumber}</strong>
                        <p style="margin: 0.25rem 0; color: var(--text-main);">Customer: ${inv.customer.name}</p>
                        <p style="margin: 0; color: var(--text-main); font-size: 0.8rem;">TRN: ${inv.trn} &nbsp;|&nbsp; Date: ${inv.date}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="font-weight: 800; color: var(--accent-color); font-size: 1.1rem;">$${inv.total}</p>
                        <p style="color: #10b981; font-size: 0.8rem; font-weight: 600;">PAID</p>
                    </div>
                </div>
            </div>
        `;
    });

    invoiceListDiv.innerHTML = html;
}

//Search invoices by TRN from the search input
function searchInvoicesByTRN() {
    let trn = document.getElementById("trn-search").value.trim();
    ShowInvoices(trn);
}

// ============================================================
// Q7c: GetUserInvoices()
// Displays all invoices for the currently logged-in user from RegistrationData
// ============================================================
function GetUserInvoices() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let myListDiv = document.getElementById("my-invoice-list");

    if (!currentUser) {
        myListDiv.innerHTML = "<p style='color: var(--text-main);'>Please <a href='index.html' style='color:var(--accent-color);'>log in</a> to view your invoices.</p>";
        return;
    }

    //Read user's invoices from their record in RegistrationData
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let userRecord = users.find(function(u) { return u.trn === currentUser.trn; });
    let userInvoices = (userRecord && Array.isArray(userRecord.invoices)) ? userRecord.invoices : [];

    if (userInvoices.length === 0) {
        myListDiv.innerHTML = "<p style='color: var(--text-main);'>You have no invoices yet. <a href='product.html' style='color:var(--accent-color);'>Start shopping!</a></p>";
        return;
    }

    let html = "<p style='color: var(--text-main); margin-bottom: 1rem; font-size: 0.9rem;'>Showing invoices for TRN: <strong style='color:var(--accent-color);'>" + currentUser.trn + "</strong></p>";
    userInvoices.forEach(function(inv) {
        html += `
            <div class="invoice-row">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                        <strong>${inv.invoiceNumber}</strong>
                        <p style="margin: 0.25rem 0; color: var(--text-main);">Date: ${inv.date}</p>
                        <p style="margin: 0; color: var(--text-main); font-size: 0.8rem;">Items: ${inv.items.map(function(i){ return i.name + " x" + i.quantity; }).join(", ")}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="font-weight: 800; color: var(--accent-color); font-size: 1.1rem;">$${inv.total}</p>
                        <p style="color: #10b981; font-size: 0.8rem; font-weight: 600;">PAID</p>
                    </div>
                </div>
            </div>
        `;
    });

    myListDiv.innerHTML = html;
}

// Run all dashboard functions when the page loads
document.addEventListener("DOMContentLoaded", function() {
    ShowUserFrequency();
    ShowInvoices();
    GetUserInvoices();
});
