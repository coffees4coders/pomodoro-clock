
document.addEventListener('DOMContentLoaded', function() {

  // Add event listeners for all UI buttons
  var breakMinusButton = document.getElementById('break-minus'),
      breakPlusButton = document.getElementById('break-plus'),
      sessionMinusButton = document.getElementById('session-minus'),
      sessionPlusButton = document.getElementById('session-plus'),
      startButton = document.getElementById('start-button'),
      stopButton = document.getElementById('stop-button'),
      resetButton = document.getElementById('reset-button');

  breakMinusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');
    var currentNumber = parseInt(breakTimer.innerHTML);

    if (currentNumber > 0) {
    breakTimer.innerHTML = currentNumber - 1;
    }
  });

  breakPlusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');
    var currentNumber = parseInt(breakTimer.innerHTML);


    breakTimer.innerHTML = currentNumber + 1;

  });

  sessionMinusButton.addEventListener('click', function() {
    var sessionTimer = document.getElementById('session-time');
    var currentNumber = parseInt(sessionTimer.innerHTML);

    if (currentNumber > 0) {
    sessionTimer.innerHTML = currentNumber - 1;
    }
  });

  sessionPlusButton.addEventListener('click', function() {
    var sessionTimer = document.getElementById('session-time');
    var currentNumber = parseInt(sessionTimer.innerHTML);

    sessionTimer.innerHTML = currentNumber + 1;

  });

});



var timer = 30;

var startTime = new Date().getTime();

setInterval(function() {
  if (new Date().getTime() - startTime >) {
    console.log('1 second elapsed');
    console.log(new Date().getSeconds());
  }
}, 500);


console.log(startTime);

// setInterval(function() {
//
//   if (startTime.getSeconds() !== new Date().getSeconds()) {
//     console.log(new Date().getSeconds());
//   }
//
// }, 200);
