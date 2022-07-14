// add a new row in html table
function addRow(summaryTable, contactName, mobileNumber, email) {
    // find out the table row
    let table = document.getElementById(summaryTable);
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    // create a cell on each row
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);    
    let cell3 = row.insertCell(2);
    
    // Assign input to each cell
    cell1.innerHTML = contactName;
    cell2.innerHTML = mobileNumber;
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
  
// input is added after clicking the button
  const submit =document.getElementById('submit');
    submit.addEventListener('click', (e) => {
        let name = document.getElementById('name').value;
        let mobile = document.getElementById('mobile').value;
        let email = document.getElementById('email').value;
  
        if (!isValidInput(name, mobile, email)) {
          // show error block
          document.getElementById("error").style.display = "inline-flex";
        } else {
         // insert input to each row
        document.getElementById("error").style.display = "none";
          const addValue = addRow("summaryTable", name, mobile, email);
            //Clear the field after submitting
            e.preventDefault();
            const inputs = document.querySelectorAll('#name, #mobile, #email');
            // looping all input and empty them
            inputs.forEach(input => {
            input.value = '';
            });
        }
    });
    //   Searching the matched numbers
    const search= document.getElementById('search');
        search.addEventListener('keyup', (e) => {
        // contains all rows data
        const searchStr = document.getElementById('search').value;
        const table = document.getElementById("summaryTable");
        const tr = table.getElementsByTagName("tr"); 
  
        // hidden rows from previous run is not shown
        for (let i = 1; i < tr.length; i++) {
        // Hide the row initially.
            tr[i].style.display = "none";
            let td = tr[i].getElementsByTagName("td");
            let cell = td[1];
            if (cell) {
                // filled field matchs the search data
                if (cell.innerHTML.includes(searchStr)) {
                    tr[i].style.display = ""; // show this row
                } 
            }
        }
    });
  // Name sorting by clicking  column "name"
  const nameCol = document.getElementById('nameColumn');
  nameCol.addEventListener('click', (e) => {
    // 0 means the first column
    sortTable(0) 
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
  
