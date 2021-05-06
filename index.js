/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (employeeInfo,rate) {
    let employee = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []    
    }
    return employee
}

let createEmployeeRecords = function(aOa) {
    let employees = aOa.map(e => createEmployeeRecord(e));
    return employees
}

let createTimeInEvent = function(dateStamp) {
    let hour = dateStamp.split(" ")[1]
    let parsedHour = parseInt(hour)
    let date = dateStamp.split(" ")[0]

    this.timeInEvents.push({type: "TimeIn", hour: parsedHour , date: date })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let hour = dateStamp.split(" ")[1]
    let parsedHour = parseInt(hour)
    let date = dateStamp.split(" ")[0]

    this.timeOutEvents.push({type: "TimeOut", hour: parsedHour , date: date })
    return this
}

let hoursWorkedOnDate = function(dateStamp){
    let inDay = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let outDay = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    return (outDay.hour - inDay.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp){
    let wage = hoursWorkedOnDate.call(this, dateStamp)
        * this.payPerHour
    return parseFloat(wage.toString())
}
