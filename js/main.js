//Creates a string with today's date
function TodaysDateString() {
    return new Date().toDateString()
};

//Adds a string to an HTML ID
function putsTodaysDateFormatted(htmlId) {
    document.getElementById(htmlId).innerHTML += " " + TodaysDateString();
};

//Adds todays date to the site subtitle
putsTodaysDateFormatted("date");