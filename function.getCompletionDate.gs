function getCompletionDate(startDate, days) {

  let sanityCount = 0
  let workDays = 0
  let endDate = startDate
  while (getWorkDays(startDate, endDate) <= days && sanityCount++ < 365) {
    endDate = endDate.addDays(1)
  }
  return endDate
}
