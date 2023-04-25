function getNextWorkingDay() {
  const twoWeeksAhead = new Date();
  twoWeeksAhead.setDate(twoWeeksAhead.getDate() + 14); // Add 14 days

  while (twoWeeksAhead.getDay() === 0 || twoWeeksAhead.getDay() === 6) {
    twoWeeksAhead.setDate(twoWeeksAhead.getDate() + 1); // Add 1 day until a weekday is reached
  }

  return twoWeeksAhead;
}

module.exports = { getNextWorkingDay };
