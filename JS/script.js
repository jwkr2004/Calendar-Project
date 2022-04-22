//Determines whether the year sent through the function is a leap year. Returns true if the year is a leap year and returns false if the year is not a leap year.
//Every 4 years is a leap year. Every century is not a leap year. Every 400 years is a leap year.
function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    else if(year % 100 === 0) {
        return false;
    }
    else if(year % 4 === 0) {
        return true;
    }
    else {
        return false;
    }
}

//Determines what months have how many days depending on whether or not the year sent from the function is a leap year and returns the array
function daysInAMonth(year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //Sets February to 29 days if the year sent is a leap year and sets February to 28 days if it is not.
    if(isLeapYear(year)) {
        days[1] = 29;
    }
    else {
        days[1] = 28;
    }
    return days;
}

function dateSetter(wDay, curMonth, year, curDay) {
    //Sets the array returned by the daysInAMonth function to a variable
    let arr = daysInAMonth(year);

    if(curMonth == 0) {
        //If month is 0 (January), set last month var to 11 (December).
        var lMonth = 11;
    }
    else {
        //If month is not January, set last month var to current month - 1
        var lMonth = curMonth - 1;
    }
    //Gets the number of days in the current month and the previous month using the daysInAMonth function.
    let daysThisMonth = arr[curMonth];
    let daysLastMonth = arr[lMonth];

    //Row Number.
    var rn = 1;

    //This is a condition that tells the loop when it has highlighted all of the correct days in the month. Once this condition is false, the rest of the days in the loop will be given the gr class (greyed out).
    var c = true;

    //Checks to see if The starting day of the month is not Sunday. If Sunday, the code will set n to 1 and continue. If not Sunday, the code will take 0 and subtract it by the number of days last month minus the starting day of the week plus one.
    if(wDay > 0) {
        var n = 0 - (daysLastMonth - wDay + 1);
    }
    else {
        var n = 1;
    }

    //This for loop is responsible for clearing classes created by the next for loop in the code. The if condition resets the index and moves to the next row in the grid until the rn variable is at the number of rows.
    for(var i = 0;i <= 6;i++) {
        document.getElementById(`r${rn}-${i}`).className = `r${rn} num`;
        if(i >= 6 && rn < 6) {
            rn++
            i = -1;
            continue;
        }
    }
    //Sets the starting row number to 1.
    rn = 1;

    //This loop gives a class to each div. If the day of month selected by the for loop is the current day, it gives the div the cu (current) class. If the day of the month is not the current day but is apart of the month, it gives the div the ac class (active). Lastly, if the day is not apart of the month or the condition (c) defined earlier is false, it will give the div the gr class(Greyed out).
    for(var i = 0;i <= 6;i++) {
        if(n == curDay && c) {
            document.getElementById(`r${rn}-${i}`).className += " cu";
        }
        else if(n > 0 && c) {
            document.getElementById(`r${rn}-${i}`).className += " ac";
        }
        else if(n <= wDay || !c) {
            document.getElementById(`r${rn}-${i}`).className += " gr";
        }
        
        document.getElementById(`r${rn}-${i}`).innerText = Math.abs(n);
        

        //Resets the day number after it reaches the number of days in the selected month
        if(n < daysThisMonth) {
            if(n + daysLastMonth == 0) {
                n = 1;
            }
            else if(n < 0) {
                n--;
            }
            else {
                n++;
            }
        }
        else {
            n = 1;
            var c = false;
        }
        if(i >= 6 && rn < 6) {
            rn++
            i = -1;
            continue;
        }
    }
}

//When given a number 0-6, returns the day of the week in string form.
function getDayOfWeek(day) {
    switch (day) {
        case 0:
            dw = "Sunday";
            break;
        case 1:
            dw = "Monday";
            break;
        case 2:
            dw = "Tuesday";
            break;
        case 3:
            dw = "Wednesday";
            break;
        case 4:
            dw = "Thursday";
            break;
        case 5:
            dw = "Friday";
            break;
        case 6:
            dw = "Saturday";
            break;
    }
    return dw;
}

//When given a number 0-11, returns the month of the year in string form.
function getMonthOfYear(month) {
    switch (month) {
        case 0:
            m = "January";
            break;
        case 1:
            m = "February";
            break;
        case 2:
            m = "March";
            break;
        case 3:
            m = "April";
            break;
        case 4:
            m = "May";
            break;
        case 5:
            m = "June";
            break;
        case 6:
            m = "July";
            break;
        case 7:
            m = "August";
            break;
        case 8:
            m = "September";
            break;
        case 9:
            m = "October";
            break;
        case 10:
            m = "November";
            break;
        case 11:
            m = "December";
            break;
    }
    return m;
}

//Defines a few global variables that will be changed later.
var selectedMonth;
var selectedYear;
var monthOfYear;

//Defines the logic behind the backwards arrow.
function backward() {
    if(selectedMonth == 0) {
        selectedYear--;
        selectedMonth = 11;
        var check = new Date(selectedYear, selectedMonth);
    }
    else {
        selectedMonth--;
        var check = new Date(selectedYear, selectedMonth);
    }
    var start = check.getDay();
    //Runs the dateSetter function with the selected month's starting day of the week, the selected month and the selected year.
    dateSetter(start, selectedMonth, selectedYear);
    monthOfYear = getMonthOfYear(selectedMonth);
    document.getElementById("themonth").innerText = `${monthOfYear}, ${selectedYear}`;
}

//Defines the logic behind the forwards arrow.
function forward() {
    var check;
    if(selectedMonth == 11) {
        selectedYear++;
        selectedMonth = 0;
        check = new Date(selectedYear, 0);
    }
    else {
        selectedMonth++;
        check = new Date(selectedYear, selectedMonth);
    }
    var start = check.getDay();
    dateSetter(start, selectedMonth, selectedYear);
    monthOfYear = getMonthOfYear(selectedMonth);
    document.getElementById("themonth").innerText = `${monthOfYear}, ${selectedYear}`;
}

window.addEventListener("load", function() {
    //This code gets the current day of the month, day of week, 
    const d = new Date();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    //Sets the selectedMonth and selectedYear to the current month and year by default
    selectedMonth = month;
    selectedYear = year;

    //Sends the day of the week in number form 0-6 and and returns the string version of that day. For example, 0 returns Sunday.
    var dayOfWeek = getDayOfWeek(day);

    //Sends the month of the year in number form 0-11 and returns the string version of that month. For instance, 2 returns March.
    monthOfYear = getMonthOfYear(month);
    
    //Sets Todays date on the webpage.
    document.getElementById("thedate").innerText = `Today is ${dayOfWeek}, ${monthOfYear} ${date}, ${year}`;
    document.getElementById("themonth").innerText = `${monthOfYear}, ${year}`;

    //This code returns a number 0-6 based on the day of the week for the first day in the month. For example, April 2022 starts on a Friday. As a result, the code returns a 5.
    let check = new Date(year, month);
    let start = check.getDay();

    //Calls the dateSetter function with the weekday of the first day of the current month, the current month, the current year, and optionally the current day of the month.
    dateSetter(start, month, year, date);

    //Gives the forwards and backwards buttons event listeners that run their functions upon being clicked.
    document.getElementById("left").addEventListener("click", backward);
    document.getElementById("right").addEventListener("click", forward);
});