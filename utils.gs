function checkIgnoreTeam(team) {
  // if the team name is prepended with "?", then ignore the task
  if (team && team[0] === '?') {
    team = ""
  }

  return team
}
function computeNumberOfSprints(tasks) {

  globals.numberOfSprints = tasks.reduce(
    (lastSprintNo, task) => Math.max(lastSprintNo, task.lastSprintNo || 0 ),
    0
  )

  // sanity check
  const MAX_SPRINTS = 12
  if (globals.numberOfSprints > MAX_SPRINTS) {
    console.log(`MAX_SPRINTS exceeded: ${globals.numberOfSprints}`)
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

function getTaskByTicket(ticket, tasks, ticketColNo) {
  return tasks.find(task => task[ticketColNo] === ticket)
}

