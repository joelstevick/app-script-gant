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

    // ignore completed tasks or tasks that are not assigned to a team
    if (task[statusColNo] !== globals.config['status-completed'] && task[teamColNo].trim().length > 0) {
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

  // sanity check
  const MAX_SPRINTS = 12
  if (globals.numberOfSprints > MAX_SPRINTS) {
    trace(`MAX_SPRINTS exceeded: ${globals.numberOfSprints}, sprints = ${sprints}`)
    globals.numberOfSprints = MAX_SPRINTS
  }
  // compute the starting date and the ending date; If the ending for the sprint is in the past, then pick the
  // current sprint according to the sprint-boundary defined by the project start date
  let startDateMs = Date.parse(globals.config['start-date'])
  let endingDate = new Date(startDateMs)
  endingDate.setDate(endingDate.getDate() + Constants.sprintDays)

  while (Date.now() > endingDate.getTime()) {
    endingDate.setDate(endingDate.getDate() + Constants.sprintDays)
  }

  const startDate = new Date(endingDate.getTime())
  startDate.setDate(startDate.getDate() - Constants.sprintDays)

  globals.startDateMs = startDate.getTime()
}
