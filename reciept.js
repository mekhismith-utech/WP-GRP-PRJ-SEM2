document.addEventListener('DOMContentLoaded', () => {
    //Default Values
    const basePrice = 25.00; 
    const serviceFee = 1.50; 
    const dateElement = document.getElementById('display-date');
    const idElement = document.getElementById('display-id');
    
    // Set initial date and unique Receipt ID
    if (dateElement) dateElement.innerText = new Date().toLocaleDateString();
    if (idElement) {
        // Generate a unique ID string
        const timestamp = Date.now().toString().slice(-6);
        idElement.innerText = `DCA-REC-${timestamp}`;
    }

    const checkoutBtn = document.getElementById('completePurchaseBtn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Data Retrieval & Type Conversion
            // Using correct DOM functions 
            const name = document.getElementById('custName').value.trim();
            const email = document.getElementById('custEmail').value.trim();
            
            //Validation Logic - Ensure name and email are provided
            if (name === "" || email === "") {
                alert("Please provide both name and email for the receipt.");
                return;
            }

            //Perform Arithmetic Calculations
            //nsure values are treated as numbers for the total
            const total = (parseFloat(basePrice) + parseFloat(serviceFee)).toFixed(2);

            //Update Receipt UI with customer details and total using innerText
            document.getElementById('display-name').innerText = name;
            document.getElementById('display-email').innerText = email;
            
            // Apply visual feedback to indicate receipt generation- a little highlight animation using transform in css
            const receiptCard = document.getElementById('receiptCard');
            receiptCard.style.transform = "scale(1.05)";
            setTimeout(() => receiptCard.style.transform = "scale(1)", 200);

            //Save to LocalStorage
            const receiptData = {
                id: idElement.innerText,
                customer: name,
                email: email,
                amount: total,
                date: dateElement.innerText
            };

            saveToHistory(receiptData);
            alert("Purchase Complete! Receipt generated and saved.");
        });
    }
});

// Handles saving and displaying history items
function saveToHistory(data) {
    const historyList = document.getElementById('savedReceiptsList');
    const noHistory = document.getElementById('noHistory');
    
    if (noHistory) noHistory.style.display = 'none';

    // Create new History Card for the saved receipt using the same card design as invoices for consistency
    const historyCard = document.createElement('div');
    historyCard.className = 'card'; 
    historyCard.style.padding = '1rem';
    historyCard.style.marginBottom = '1rem';
    
    historyCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="color: var(--accent-color);">${data.id}</strong>
                <p style="margin: 5px 0; font-size: 0.85rem;">${data.customer}</p>
                <small style="color: var(--text-main);">${data.date}</small>
            </div>
            <div style="text-align: right;">
                <p style="font-weight: 800; color: var(--text-light);">$${data.amount}</p>
                <button class="btn" onclick="window.print()" style="padding: 5px 10px; font-size: 0.7rem;">Print</button>
            </div>
        </div>
    `;

    // Add to the top of the list
    historyList.prepend(historyCard);
}