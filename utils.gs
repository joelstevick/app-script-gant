function computeNumberOfSprints() {
  
  // read all of the rows below the header
  const tasks = globals.sheet.slice(2)

  // accummulate the story points
  let totalPoints = 0
  let pointsColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("points"))

  tasks.forEach(task => {
    // locate the story points column
    totalPoints += task[pointsColNo]
  })
  globals.numberOfSprints = Math.ceil(totalPoints / globals.config['sprint-capacity']) 
}
