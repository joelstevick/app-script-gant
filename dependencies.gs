class Dependencies {

  constructor(tasks, rowNo) {
    this.dependenciesColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("dependencies"))
    this.dependencies = {}

    const sheet = SpreadsheetApp.getActiveSheet()

    // for each task parse the dependencies -- a task can have multiple dependencies
    tasks.forEach(task => {

      const range = `${alphabet[this.dependenciesColNo]}${rowNo}`

      const formula = sheet.getRange(range).getFormula();

      if (formula) {

        const dependencies = formula.split(',')

        dependencies.forEach(dependency => {
          var linkedCellReference = dependency.match(/[A-Za-z]+[0-9]+/g)[0];

          var linkedRowNo = linkedCellReference.match(/\d+/g)[0];

          const deps = this.dependencies[rowNo] || []

          deps.push(linkedRowNo)

          this.dependencies[rowNo] = deps
        })

        trace(`deps: ${JSON.stringify(this.dependencies)}`)

      }

      rowNo++
    })
  }
}