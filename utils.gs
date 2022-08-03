function computeNumberOfSprints() {

  // read all of the rows below the header
  const tasks = globals.sheet.slice(2)

  // accummulate the story points
  let totalPoints = 0
  const pointsColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("points"))
  const statusColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("status"))

  // determine the total number of sprints
  tasks.forEach(task => {
    // ignore completed tasks
    if (task[statusColNo] !== globals.config.completed) {
      // locate the story points column
      totalPoints += task[pointsColNo]
    }
  })
  globals.numberOfSprints = Math.ceil(totalPoints / globals.config['sprint-capacity'])

  // compute the starting date
  let startDateMs = Date.parse(globals.config['start-date'])

  if (Date.now > startDateMs) {
    startDateMs = Data.now
  }

  globals.startDateMs = startDateMs
}
