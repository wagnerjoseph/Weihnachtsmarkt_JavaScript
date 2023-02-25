<<<<<<< HEAD
// code from benji ------------------------------------------------------------------------------------------
async function onFileChange(event) {

  let file = null;
  console.log(event.target.files)
  
  for (let i = 0; i < event.target.files.length; i++) {
    
    file = event.target.files[i];                 // event.target.files() reads the seleted files
    let buffer = await file.arrayBuffer();        // programm continues if await is executed
    //console.log(buffer)                 // somehow reads the file and stores it somewhere in its thousand subfolders
    let workbook = XLSX.read(buffer);             // acesses the data from the buffer; workbook is a object with way to many things in it
    //console.log(workbook)

    let sheet = workbook.Sheets.Tabelle1;         // the wanted data is in workbook.sheets.Tabelle1
    let rawData = XLSX.utils.sheet_to_json(sheet, { header: "A" });
    console.log(rawData)

    data = formatData(rawData);
    console.log(data);

    // Create the HTML table element
const table = document.createElement('table');

// Create the table header row
const headerRow = document.createElement('tr');
for (const key in data) {
  const headerCell = document.createElement('th');
  headerCell.textContent = key;
  headerRow.appendChild(headerCell);
}
table.appendChild(headerRow);

// Create the table body rows
for (let i = 0; i < Math.max(...Object.values(data).map((arr) => arr.length)); i++) {
  const bodyRow = document.createElement('tr');
  for (const key in data) {
    const bodyCell = document.createElement('td');
    bodyCell.textContent = data[key][i] !== undefined ? data[key][i] : '';
    bodyRow.appendChild(bodyCell);
  }
  table.appendChild(bodyRow);
}

// Append the table to the HTML page
document.body.appendChild(table);
console.log()
    //let date = file.name.split(".xlsx")[0]
        //let obj = {
     // date,
     // data
    //}
=======
async function onFileChange(event) {
  
  let file = null;
  console.log(event.target.files)

  for (let i = 0; i < event.target.files.length; i++){
    file = event.target.files[i];                 // event.target.files() reads the seleted files
    let buffer = await file.arrayBuffer();        // programm continues if await is executed
    console.log(buffer)                 // somehow reads the file and stores it somwhere in its thousand subfolders
    let workbook = XLSX.read(buffer);             // acesses the data from the buffer; workbook is a object with way to many things in it
    console.log(workbook)

    let sheet = workbook.Sheets.Tabelle1          // the wanted data is in workbook.sheets.Tabelle1
    let rawData = XLSX.utils.sheet_to_json(sheet, { header: "A" });
    let date = file.name.split(".xlsx")[0]
    let data = formatData(rawData)

    let obj = {
      date,
      data
    }
    console.log(obj)
>>>>>>> 41e1d0b62fa8cab99fdde12a3a3dd651e5e6c7f5
  }
}

function formatData(raw) {
  return raw.reduce((result, row) => {
    result[row["A"]] = Object.entries(row).reduce((entries, [col, value]) => {
      return col === "A" ? entries : [...entries, value]
    }, [])
    return result
  }, {})
}

<<<<<<< HEAD
const fileUpload = document.getElementById("selectedFiles")
fileUpload.addEventListener("change", onFileChange)   
=======
const fileUpload = document.getElementById("selectFiles")
fileUpload.addEventListener("change", onFileChange)      // when fileUpload is "changed" onFileChange is run
>>>>>>> 41e1d0b62fa8cab99fdde12a3a3dd651e5e6c7f5
