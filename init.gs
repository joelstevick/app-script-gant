function init() {
  // read the spreadsheet
  globals.sheet = SpreadsheetApp.getActiveSheet().getDataRange().getValues();

  // get the config obj
  globals.sheet.forEach(row => {
    row.forEach(column => {
      if (typeof column === 'string' && column.includes(Constants.projectConfig)) {
        globals.config = JSON.parse(column.slice(Constants.projectConfig.length))
      }
    })
  })
  // read the global vars

}
