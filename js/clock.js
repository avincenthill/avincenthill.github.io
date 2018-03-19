//script for anaolog clock project
//TBD: fix changeover animation from :59 to :00 mins

var secondHand = document.querySelector(".second-hand");
var minsHand = document.querySelector(".min-hand");
var hourHand = document.querySelector(".hour-hand");

function setDate() {
  var now = new Date();

  var seconds = now.getSeconds();
  var secondsDegrees = seconds / 60 * 360 - 180;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  var mins = now.getMinutes();
  var minsDegrees = mins / 60 * 360 + seconds / 60 * 6 - 180;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  var hour = now.getHours();
  var hourDegrees = hour / 12 * 360 + mins / 60 * 30 - 180;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  //create time string and add formatting 0s
  var time = "";
  if (hour < 10) {
    time = time.concat("0", hour);
  } else {
    time = time.concat(hour);
  }

  if (mins < 10) {
    time = time.concat(":0", mins);
  } else {
    time = time.concat(":", mins);
  }

  document.getElementById("time").innerHTML = time;
}

setInterval(setDate, 1000);

setDate();
