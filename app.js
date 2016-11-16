
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

  startButton.addEventListener('click', function() {
    timer.startTimer();
  });

  stopButton.addEventListener('click', function() {
    timer.stopTimer();
  });

  resetButton.addEventListener('click', function() {
    // add code
  });

});

// break this up into two objects to handle break and session timers
var timer = {
  // all units of time are in seconds
  timerSetting: 1500,
  breakSetting: 5,
  currentSeconds: 0,
  // this will point to the countdown timer <div id="countdown-timer">
  countDown: '25:00',
  currentIntervalID: null,

  // takes a string in mm:ss format and updates the countDown prop
  updateTimer: function(newTime) {
    this.countDown = newTime;
  },
  startTimer: function() {
    // main countdown clock
    var countDownDisplay = document.getElementById('countdown-timer');

    var timer = this.timerSetting;

    var timeStamp = new Date().getTime();
    var prevTime = 0;
    var intervalID = setInterval(function() {
      var diff = (new Date().getTime() - timeStamp) / 1000;
      var newTime = parseInt(timer - diff);

      if (newTime !== prevTime) {
        updateDisplay(countDownDisplay, newTime)
        // console.log('update display with new time: ' + convertSecondsToDisplayTime(newTime));
      }

    prevTime = newTime;

    }, 250);


    // setTimeout(function() {clearInterval(intervalID)}, 20000);
    this.currentIntervalID = intervalID;
  },

  stopTimer: function() {
    clearInterval(this.currentIntervalID);
  }

};

// takes ref to div and updates with new time
function updateDisplay(timerObject, seconds) {

    timerObject.innerHTML = convertSecondsToDisplayTime(seconds);

}

function convertSecondsToDisplayTime(seconds) {

  var timerSeconds = seconds;
  var newDisplayTime = parseInt(timerSeconds / 60).toString() + ':' +
                    (timerSeconds % 60).toString();

  // returns minutes and seconds in a string
  return newDisplayTime;
}
