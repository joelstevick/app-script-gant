function getCompletionDate(startDate, days) {

  let sanityCount = 0
  let workDays = 0
  let endDate = startDate
  while (getWorkDays(startDate, endDate) <= days + 1 && sanityCount++ < 365) {
    endDate = endDate.addDays(1)
  }
  return endDate
}
