function trace(record) {
  // get the current trace data
  let traceRecords = SpreadsheetApp.getActiveSheet().getRange(Constants.traceCell.rowNo, Constants.traceCell.colNo).getValue() || ''

  const now = new Date()
  traceRecords += `${now.toDateString()} ${now.toTimeString()}: ${record}\n`

  SpreadsheetApp.getActiveSheet().getRange(Constants.traceCell.rowNo, Constants.traceCell.colNo).setValue(traceRecords)

}
