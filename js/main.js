//Adds today's date to subtitle

function putsTodaysDateFormatted(htmlId) {
    var d = new Date();
    document.getElementById(htmlId).innerHTML += " " + d.toDateString();
};

putsTodaysDateFormatted("date");