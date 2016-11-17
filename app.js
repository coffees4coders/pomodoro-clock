
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

    if (timer.sessionSetting > 0) {
      timer.sessionSetting -= 60;
      updateDisplay(sessionTimer, timer.sessionSetting);
    }
  });

  sessionPlusButton.addEventListener('click', function() {
    var sessionTimer = document.getElementById('session-time');
    var currentNumber = parseInt(sessionTimer.innerHTML);

    sessionTimer.innerHTML = currentNumber + 1;
      timer.timerSetting += 60;

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

// takes ref to div and updates with new time
function updateDisplay(timerObject, seconds) {


  timerObject.innerHTML = convertSecondsToDisplayTime(seconds);


}

/*
  Parameters:
     seconds: number -  seconds to be converted into mm (optionally mm:ss)
     includeSeconds: bool - if true: display as mm:ss, false (default value): mm
  Returns a string
*/
function convertSecondsToDisplayTime(seconds, includeSeconds) {

// FIXME: output for 61 is '1:1', it should be '1:01'
  var newDisplayTime = parseInt(seconds / 60).toString() + ':' +
                    (seconds % 60).toString();

  // returns minutes and seconds in a string
  return newDisplayTime;
}


// break this up into two objects to handle break and session timers
var timer = {
  // all units of time are in seconds
  sessionSetting: 1500,
  breakSetting: 300,
  currentSeconds: 0,
  currentIntervalID: null,
  // takes two parameters
  // timer specifies if it's the break or session timer
  // seconds is the number of seconds
  updateTimer: function(timer, seconds) {
    // countDownDisplay.innerHTML = convertSecondsToDisplayTime(seconds);
  },

  startTimer: function() {
    // main countdown clock
    var countDownDisplay = document.getElementById('main-countdown-timer');

    var timer = this.sessionSetting;

    var timeStamp = new Date().getTime();
    var prevTime = 0;
    var intervalID = setInterval(function() {
      var diff = (new Date().getTime() - timeStamp) / 1000;
      var newTime = parseInt(timer - diff);

      // the view is only updated if the number of seconds has change since
      // the last time this method is called
      if (newTime !== prevTime) {
        updateDisplay(countDownDisplay, newTime);
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
