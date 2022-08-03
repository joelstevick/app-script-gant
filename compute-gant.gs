function computeGant() {
  init();

  if (!globals.config) {
    throw new Error('No ::project-config::')
  }
  console.log('config', globals.config);

  applyHeader()

  // compute the gant chart for each task
  // read all of the rows below the header
  const tasks = globals.sheet.slice(2)

  // accummulate the current story points
  let currentPoints = 0
  const pointsColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("points"))
  const statusColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("status"))

  // determine the total number of sprints
  tasks.forEach(task => {
    // ignore completed tasks
    if (task[statusColNo] !== globals.config.completed) {
      // determine which sprint that task belongs to
      const sprintNo = Math.ceil(currentPoints / globals.config['sprint-capacity'])

      // fill in the bg for the related sprint
      
      // locate the story points column and accumulate them
      currentPoints += task[pointsColNo]
    }
  })
}

