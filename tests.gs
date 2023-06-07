// mock data
globals.config = {}

// custom assert
function assert(condition, message) {
  if (!condition) {
    console.log(`Assert Failed: ${message || "Assertion failed"}`);
  }
}
// computeNumberOfSprints
// Test 1: Check the number of sprints
let tasks1 = [
  {lastSprintNo: 1}, 
  {lastSprintNo: 3}, 
  {lastSprintNo: 2}
];
globals.config['start-date'] = (new Date()).toISOString();
Constants.sprintDays = 7;
computeNumberOfSprints(tasks1);
assert(globals.numberOfSprints === 3, 'Number of sprints not computed correctly for tasks1');

// Test 2: Check if MAX_SPRINTS is respected
let tasks2 = [];
for(let i=0; i<12; i++) {
  tasks2.push({lastSprintNo: i+1});
}
computeNumberOfSprints(tasks2);
assert(globals.numberOfSprints === 12, 'MAX_SPRINTS not respected');

// Test 3: Check if the start date is computed correctly
let tasks3 = [
  {lastSprintNo: 1}, 
  {lastSprintNo: 2}, 
  {lastSprintNo: 3}
];
globals.config['start-date'] = (new Date()).toISOString();
Constants.sprintDays = 7;
computeNumberOfSprints(tasks3);
let expectedStartDateMs = (new Date()).getTime() - (Constants.sprintDays * 24 * 60 * 60 * 1000);
assert(Math.abs(globals.startDateMs - expectedStartDateMs) <= 24 * 60 * 60 * 1000, 'Start date not computed correctly');





// run the tests
function runTests() {
  console.log('tests completed')
}
