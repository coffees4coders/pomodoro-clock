
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

// break this up into two objects to handle break and session timers
var timer = {
  timerSetting: '25:00',
  breakSetting: '5:00',
  currentSeconds: 0

};

function convertSecondsToDisplayTime(seconds) {

  var timerSeconds = seconds;
  var newDisplayTime = parseInt(timerSeconds / 60).toString() + ':' +
                    (timerSeconds % 60).toString();

  // returns minutes and seconds in a string
  return newDisplayTime;
}

function startTimer(seconds) {
  var timer = seconds;

  var timeStamp = new Date().getTime();
  var prevTime = 0;
  var interval = setInterval(function() {
    var diff = (new Date().getTime() - timeStamp) / 1000;
    var newTime = parseInt(timer - diff);

    if (newTime !== prevTime) {
      console.log('update display with new time: ' + convertSecondsToDisplayTime(newTime));
    }

  prevTime = newTime;

  }, 250);


  setTimeout(function() {clearInterval(interval)}, 20000);

}

startTimer(300);
