class Dependencies {

  constructor(tasks, firstTaskRowNo) {

    let rowNo = firstTaskRowNo
    this.dependenciesColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("dependencies"))
    this.ticketColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("ticket"))

    this.dependencies = {}

    this.sheet = SpreadsheetApp.getActiveSheet()

    // for each task parse the dependencies -- a task can have multiple dependencies
    tasks.forEach(task => {

      const range = `${alphabet[this.dependenciesColNo]}${rowNo}`

      const formula = this.sheet.getRange(range).getFormula();

      if (formula) {

        const dependencies = formula.split(',')

        dependencies.forEach(dependency => {
          const linkedCellReference = dependency.match(/[A-Za-z]+[0-9]+/g)[0];

          const linkedRowNo = linkedCellReference.match(/\d+/g)[0];

          const dependencyTask = tasks[linkedRowNo - firstTaskRowNo]

          const deps = this.dependencies[task] || []

          deps.push(dependencyTask)

          this.dependencies[task] = deps
        })

      }

      rowNo++
    })

    trace(`deps: ${JSON.stringify(this.dependencies)}`)

  }

  // get the dependencies as tasks
  getDependencies(task) {
    return this.dependencies[task] || []
  }

}