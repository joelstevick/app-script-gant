function applyHeader() {
  // get hte header
  const headerRange = SpreadsheetApp.getActiveSheet().getRange("A2:Z2");

  // clear the header
  headerRange.clearContent();

  // add each header column from the schema
  let colNum = 1

  globals.config.schema.forEach(columnDef => {
      // apply each column name
      SpreadsheetApp.getActiveSheet().getRange(2, colNum).setValue(columnDef.name)

      colNum ++
  })

  // add the sprints
  computeNumberOfSprints()

  let sprintStartDate = new Date(globals.startDateMs)

  for (let i = 0; i < globals.numberOfSprints; i++) {
     // apply each sprint column name
      SpreadsheetApp.getActiveSheet().getRange(2, colNum).setValue(sprintStartDate)

      colNum ++
  }

}
