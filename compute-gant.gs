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
  let row = 3
  tasks.forEach(task => {
    // ignore completed tasks
    if (task[statusColNo] !== globals.config.completed) {

      // determine which sprint that task belongs to
      const firstSprintNo = Math.floor(currentPoints / globals.config['sprint-capacity'])

      const sprintsSpanned = Math.ceil(task[pointsColNo] / globals.config['sprint-capacity'])

      const pallete = Constants.gant

      // fill in the bg for the related sprint
      for (let i = 0; i < 20; i++) {
        const translatedI = globals.config.schema.length + i + 1

        console.log(i, firstSprintNo)
        if (i === firstSprintNo || (i > firstSprintNo && i < firstSprintNo + sprintsSpanned)) {
          SpreadsheetApp.getActiveSheet().getRange(row, translatedI).setBackground(pallete.bg)
          SpreadsheetApp.getActiveSheet().getRange(row, translatedI).setFontColor(pallete.color)
        } else {
          SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearFormat()
        }
      }

      // accumulate the story points from the designated column
      currentPoints += task[pointsColNo]

    } else {
      // completed, clear all
      for (let i = 0; i < 20; i++) {
        const translatedI = globals.config.schema.length + i + 1
        SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearFormat()
        SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearContent()
      }
    }

    // next row
    row++
  })
}

