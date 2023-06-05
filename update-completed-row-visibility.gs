function updateCompletedRowVisibilility(visible) {
  init();

  const statusColNo = globals.config.schema.findIndex(colDef => colDef.semantics && colDef.semantics.includes("status"))

  const tasks = globals.sheet.slice(2)

  let row = 3

  tasks.forEach(task => {

    const isCompleted = globals.config['status-completed'].includes(task[statusColNo])

    if (isCompleted) {

      if (visible) {
        SpreadsheetApp.getActiveSheet().showRows(row, 1)
      } else {
        SpreadsheetApp.getActiveSheet().hideRows(row, 1)
      }
    }

    row++

  })

}
