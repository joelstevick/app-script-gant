function init() {
  // read the spreadsheet
  const sheet = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

  console.log(sheet)
  // get the config obj
  sheet.forEach(row => {
    row.forEach(column => {
      if (typeof column === 'string' && column.includes(Constants.projectConfig)) {
        globals.config = JSON.parse(column.slice(Constants.projectConfig.length))
      }
    })
  })
  // read the global vars

}
