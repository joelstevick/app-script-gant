function computeNumberOfSprints() {


  // read all of the rows below the header
  const tasks = globals.sheet.slice(2)

  // accummulate the story points
  let teamPoints = {}

  const pointsColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("points"))
  const statusColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("status"))
  const teamColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("team"))

  // determine the total number of sprints, for each team
  tasks.forEach(task => {

    const team = task[teamColNo]
    let currPoints = teamPoints[team] || 0

    // ignore completed tasks
    if (task[statusColNo] !== globals.config.completed) {
      // locate the story points column
      currPoints += task[pointsColNo]

      teamPoints[team] = currPoints
    }
  })

  // for each team, calculate the required sprints
  const sprints = []
  for (let team of Object.keys(teamPoints)) {
    if (team) {
      const teamVelocity = globals.config.team[team]['velocity']
      const teamSprintsRequired = Math.ceil(teamPoints[team] / teamVelocity)
      sprints.push(teamSprintsRequired)
    }
  }

  globals.numberOfSprints = Math.max(...sprints)

  // compute the starting date
  let startDateMs = Date.parse(globals.config['start-date'])

  if (Date.now() > startDateMs) {
    startDateMs = Date.now()
  }

  globals.startDateMs = startDateMs
}
