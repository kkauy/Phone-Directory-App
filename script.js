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
    let contactNameRegex = new RegExp("(?=^.{0,20}$)^([a-zA-Z ]+)$");
    let mobileNumberRegex = new RegExp("(?=^.{10}$)^([0-9]+)$");
    let emailRegex = new RegExp("(?=^.{0,40}$)^([a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3})$");
  
    if (!contactNameRegex.test(contactName)) {
        return false;
    }
    if (!mobileNumberRegex.test(mobileNumber)) {
        return false;
    }
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
  }
  
  document.getElementById('submit').addEventListener('click', (e) => {
      let name = document.getElementById('name').value;
      let mobile = document.getElementById('mobile').value;
      let email = document.getElementById('email').value;
  
      if (!isValidInput(name, mobile, email)) {
          // show error block
          document.getElementById("error").style.display = "inline";
      } else {
        document.getElementById("error").style.display = "none";
          addRow("summaryTable", name, mobile, email);
      }
  });
  
  document.getElementById('search').addEventListener('keyup', (e) => {
  
    let searchStr = document.getElementById('search').value;
    
    let table = document.getElementById("summaryTable");
    let tr = table.getElementsByTagName("tr"); // contains all rows data
  
  
    // TODO: need to re-initialize somehow?
    // hidden rows from previous run is not shown
  
    for (let i = 1; i <= tr.length; i++) {
      // Hide the row initially.
      tr[i].style.display = "none";
  
      let td = tr[i].getElementsByTagName("td");
      let cell = td[1];
      if (cell) {
        if (cell.innerHTML.includes(searchStr)) {
          tr[i].style.display = ""; // show this row
          break;
        } 
      }
    }
  });
  
  function sortTable(n){
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("summaryTable");
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  document.getElementById('nameColumn').addEventListener('click', (e) => {
    sortTable(0) // 0 means the first column
  });