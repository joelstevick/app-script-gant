class Dependencies {

  constructor(tasks, rowNo) {
    this.dependenciesColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("dependencies"))
    const sheet = SpreadsheetApp.getActiveSheet()
    trace(`dependenciesColNo ${this.dependenciesColNo}`)
    tasks.forEach(task => {

      const range = `${alphabet[this.dependenciesColNo]}${rowNo}`
      trace(`range = ${range}`)

      const formula = sheet.getRange(range).getFormula();

      if (formula) {
        var linkedCellReference = formula.match(/[A-Za-z]+[0-9]+/g)[0];

        var linkedRow = linkedCellReference.match(/\d+/g)[0];

        trace(`task ${rowNo} linkedRow: ${linkedRow}`)
      }

      rowNo++
    })
  }
}