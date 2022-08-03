function computeNumberOfSprints() {
  
  // read all of the rows below the header
  const tasks = globals.sheet.slice(2)

  globals.numberOfSprints = tasks.length
}
