// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    if (timeIn && timeOut) {
      const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
      return hoursWorked;
    }
    return 0;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Example usage:
  const employeeData = [
    ["Loki", "Laufeyson", "Manager", 25],
    ["Natalia", "Romanova", "Supervisor", 30]
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2023-10-05 08:00");
  createTimeOutEvent(employees[0], "2023-10-05 16:00");
  
  createTimeInEvent(employees[1], "2023-10-05 09:00");
  createTimeOutEvent(employees[1], "2023-10-05 17:00");
  
  console.log(calculatePayroll(employees));
  
