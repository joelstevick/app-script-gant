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
  const completedColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("completed"))

  // determine the total number of sprints
  let row = 3
  tasks.forEach(task => {
    // initialize column style
    SpreadsheetApp.getActiveSheet().getRange(row, completedColNo + 1).clearFormat()

    // ignore completed tasks
    if (task[statusColNo] !== globals.config['status-completed']) {

      // determine which sprint that task belongs to
      const firstSprintNo = Math.floor(currentPoints / globals.config['sprint-velocity'])

      const sprintsSpanned = Math.ceil((task[pointsColNo] + currentPoints) / globals.config['sprint-velocity'])

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
      // completed

      // clear all gant columns
      for (let i = 0; i < 20; i++) {
        const translatedI = globals.config.schema.length + i + 1
        SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearFormat()
        SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearContent()
      }

      // highlight, if recently completed
      const completedHighlightAgeDays = globals.config['completed-highlight-age'] || 14

      const threshold = new Date()
      threshold.setDate(threshold.getDate() - completedHighlightAgeDays)

      const completed = new Date(task[completedColNo])

      if (completed.getTime() >= threshold.getTime()) {
        const bg = globals.config['completed-highlight-color'] || 'yellow'
        SpreadsheetApp.getActiveSheet().getRange(row, completedColNo + 1).setBackground(bg)
      }
    }

    // next row
    row++
  })
}

