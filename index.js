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

const fileUpload = document.getElementById("selectFiles")
fileUpload.addEventListener("change", onFileChange)      // when fileUpload is "changed" onFileChange is run
