function trace(record) {
  // simply do a console.log
  console.log(record);
  return
  
  // get the current trace data
  let traceRecords = SpreadsheetApp.getActiveSheet().getRange(Constants.traceCell.rowNo, Constants.traceCell.colNo).getValue() || ''

  const now = new Date()
  traceRecords += `${now.toDateString()} ${now.toTimeString()}: ${record}\r\n`

  SpreadsheetApp.getActiveSheet().getRange(Constants.traceCell.rowNo, Constants.traceCell.colNo).setValue(traceRecords.trim())

}
