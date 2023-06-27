function applyHeader(tasks) {
  // get the header
  const headerRange = SpreadsheetApp.getActiveSheet().getRange("A2:Z2");

  // clear the header
  headerRange.clearContent()
  headerRange.clearFormat();

  // add each header column from the schema
  let colNum = 1

  globals.config.schema.forEach(columnDef => {
    // apply each column name
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setValue(columnDef.name)

    // header style
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setFontWeight('bold')

    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setBackground(globals.config.header.bg)

    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setFontColor(globals.config.header.color)

    colNum++
  })

  // add the sprints
  computeNumberOfSprints(tasks)

  let sprintLabel = new Date(globals.startDateMs)
  // display end of sprint as the label
  const labelOffsetDays = 2 * 7
  sprintLabel.setDate(sprintLabel.getDate() + labelOffsetDays)

  // debug
  console.log(`number of sprints = ${globals.numberOfSprints}`)
  for (let i = 0; i < globals.numberOfSprints; i++) {
    // apply each sprint column name
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setValue(sprintLabel)

    let pallete = i % 2 === 0 ? Constants.even : Constants.odd

    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setBackground(pallete.bg)
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setFontColor(pallete.color)
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setHorizontalAlignment("right")

    sprintLabel.setDate(sprintLabel.getDate() + 2 * 7)

    colNum++
  }

  // add the release date
  if (false) {
    const releaseDate = sprintLabel
    releaseDate.setDate(releaseDate.getDate() - labelOffsetDays)
    releaseDate.setDate(releaseDate.getDate() + globals.config.release['allowance-days'])

    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setValue(releaseDate.toLocaleDateString())
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setBackground(globals.config.release.bg)
    SpreadsheetApp.getActiveSheet().getRange(2, colNum).setFontColor(globals.config.release.color)
  }
}
