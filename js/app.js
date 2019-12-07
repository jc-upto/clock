
let clock = new Clock(document.getElementById("first-one"));

// Styling the clock object.
clock.style.background = "white";
clock.style.minutesDelimitersWidth = 5;
clock.style.hoursDelimitersWidth = 8;
clock.style.fontSize = "35px";
clock.style.fontFamily = "cursive";
clock.style.hoursLinesColor = "#bf1b16";
clock.style.handsColor = "#bf51aa";

// Starting the clock.
clock.start();