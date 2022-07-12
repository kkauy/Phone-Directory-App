// add a new row in html table
function addRow(summaryTable, contactName, mobileNumber, email) {

    let table = document.getElementById(summaryTable);

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    let cell1 = row.insertCell(0);
    cell1.innerHTML = contactName;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = mobileNumber;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = email;
}

// validate input before adding the new row
function isValidInput(contactName, mobileNumber, email) {
    let contactNameRegex = new RegExp("^[a-zA-Z ]+{0,20}$");
    let mobileNumberRegex = new RegExp("^[0-9]{10}$");
    let emailRegex = new RegExp("^([a-zA-Z0-9]+@[a-zA-Z0-9]+){0,40}$");

    if (contactNameRegex.test(contactName)) {
        return false;
    }
    if (mobileNumberRegex.test(mobileNumber)) {
        return false;
    }
    if (emailRegex.test(email)) {
        return false;
    }
    return true;
}

document.getElementById('submit').addEventListener('click', (e) => {
    let name = document.getElementById('name').value;
    let mobile = document.getElementById('mobile').value;
    let email = document.getElementById('email').value;

    if (isValidInput(name, mobile, email)) {
        addRow("summaryTable", name, mobile, email);
    } else {
        // show error block
    }
});