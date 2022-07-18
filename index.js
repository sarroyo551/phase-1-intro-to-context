// Your code here
function createEmployeeRecord(array) {
  console.log(array);
  const obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
  //return
}

function createEmployeeRecords(arrOfArr) {
  return arrOfArr.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const splitDateStamp = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: +splitDateStamp[1],
    date: splitDateStamp[0],
    /*hour: dateStamp.split(" ")[1],
    date: dateStamp.split(" ")[0],*/
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const splitDateStamp = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: +splitDateStamp[1],
    date: splitDateStamp[0],
    /*hour: dateStamp.split(" ")[1],
    date: dateStamp.split(" ")[0],*/
  });

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateOfForm) {
    const timeIn = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === dateOfForm)
    const timeOut = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === dateOfForm)
    return (timeOut.hour - timeIn.hour)/100

}

function wagesEarnedOnDate(employeeRecord, dateOfForm) {
    return hoursWorkedOnDate(employeeRecord, dateOfForm) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const daysWorked = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date);
    const wagesEarned = daysWorked.map(day => wagesEarnedOnDate(employeeRecord, day));
     return wagesEarned.reduce((accumulator, entry) => accumulator + entry, 0)
}

function calculatePayroll(employeeRecordArr) {
    const wagesEarned = employeeRecordArr.map(allWagesFor)
    return wagesEarned.reduce((accumulator, entry) => accumulator + entry, 0)
}
