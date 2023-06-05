
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Zonar PM')
    .addItem('Compute Gant', 'computeGant')
    .addItem('Hide Completed Rows', 'hideCompletedRows')
    .addItem('Show Completed Rows', 'showCompletedRows')
    .addToUi()

}