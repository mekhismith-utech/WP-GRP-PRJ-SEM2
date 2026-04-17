// Q6: Invoice Generation
// On page load, retrieve the last generated invoice from localStorage and populate the invoice fields using DOM manipulation. Build the line items table dynamically based on the items in the invoice.

document.addEventListener("DOMContentLoaded", function() {

    //Retrieve the last generated invoice from localStorage using JSON.parse()
    let invoice = JSON.parse(localStorage.getItem("lastInvoice"));

    if (!invoice) {
        document.getElementById("invoice-card").innerHTML = `
            <p style="text-align:center; color: var(--text-main); padding: 2rem;">
                No invoice found. <a href="product.html" style="color:var(--accent-color);">Go shopping</a> and complete a checkout first.
            </p>
        `;
        return;
    }

    //Populate invoice fields using DOM manipulation (innerHTML / innerText)
    document.getElementById("inv-company").innerText = invoice.company;
    document.getElementById("inv-number").innerText = "Invoice #: " + invoice.invoiceNumber;
    document.getElementById("inv-name").innerText = invoice.customer.name;
    document.getElementById("inv-email").innerText = invoice.customer.email;
    document.getElementById("inv-address").innerText = invoice.customer.address;
    document.getElementById("inv-date").innerText = invoice.date;
    document.getElementById("inv-trn").innerText = invoice.trn;
    document.getElementById("inv-subtotal").innerText = "$" + invoice.subtotal;
    document.getElementById("inv-discount").innerText = "-$" + invoice.discount;
    document.getElementById("inv-tax").innerText = "$" + invoice.tax;
    document.getElementById("inv-total").innerText = "$" + invoice.total;

    //Build the line items table dynamically using innerHTML
    let itemsHTML = "";
    invoice.items.forEach(function(item) {
        itemsHTML += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.6rem 0; color: var(--text-light);">${item.name}</td>
                <td style="text-align: center; padding: 0.6rem 0; color: var(--text-main);">${item.quantity}</td>
                <td style="text-align: right; padding: 0.6rem 0; color: var(--text-main);">$${parseFloat(item.price).toFixed(2)}</td>
                <td style="text-align: right; padding: 0.6rem 0; font-weight: 600; color: var(--text-light);">$${item.lineTotal}</td>
            </tr>
        `;
    });

    document.getElementById("inv-items").innerHTML = itemsHTML;
});
