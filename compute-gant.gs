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

  runGantEngine(tasks)
}
function runGantEngine(tasks) {
  // accummulate the current story points
  let currentTeamPoints = {}
  const pointsColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("points"))
  const statusColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("status"))
  const completedColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("completed"))
  const teamColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("team"))
  const ticketColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("ticket"))

  // determine the total number of sprints
  let row = 3
  tasks.forEach(task => {
    // initialize column style
    SpreadsheetApp.getActiveSheet().getRange(row, completedColNo + 1).clearFormat()

    // get the team
    const team = task[teamColNo]

    // ignore completed tasks
    if (globals.config.team[team] && task[statusColNo] !== globals.config['status-completed']) {

      // determine which sprint that the task belongs to
      let currPoints = currentTeamPoints[team] || 0

      const firstSprintNo = Math.floor(currPoints / globals.config.team[team]['velocity'])

      const lastSprintNo = Math.ceil((task[pointsColNo] + currPoints) / globals.config.team[team]['velocity'])

      const teamBg = globals.config.team[team]['bg']

      // fill in the bg for the related sprint
      for (let i = 0; i < 20; i++) {
        const translatedI = globals.config.schema.length + i + 1

        if (i === firstSprintNo || (i > firstSprintNo && i < lastSprintNo)) {
          SpreadsheetApp.getActiveSheet().getRange(row, translatedI).setBackground(teamBg)
        } else {
          SpreadsheetApp.getActiveSheet().getRange(row, translatedI).clearFormat()
        }
      }

      // accumulate the story points from the designated column
      currPoints += task[pointsColNo]
      currentTeamPoints[team] = currPoints

    } else if (team || task[statusColNo] === globals.config['status-cannot-reproduce'] || task[statusColNo] === globals.config['status-deferred']) {

      // completed or deferred
      const maxGantColumns = 20

      // clear all gant columns
      for (let i = 0; i < maxGantColumns; i++) {
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

      // change the foreground color for the entire row
      for (let col = 1; col <= globals.config.schema.length; col++) {
        if (globals.config.team[team] && task[statusColNo] === globals.config['status-completed']) {
          SpreadsheetApp.getActiveSheet().getRange(row, col).setFontColor(globals.config['completed-row-font-color'] || 'green')
        } else if (task[statusColNo] === globals.config['status-deferred']) {
          SpreadsheetApp.getActiveSheet().getRange(row, col).setFontColor(globals.config['deferred-row-font-color'] || 'gray')
        } else if (task[statusColNo] === globals.config['status-cannot-reproduce']) {
          SpreadsheetApp.getActiveSheet().getRange(row, col).setFontColor(globals.config['cannot=reproduce-row-font-color'] || 'gray')
        } 
    
      }
    }

    // next row
    row++
  })
}

