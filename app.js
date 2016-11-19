
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

    if (timer.breakSetting > 0) {
      timer.breakSetting -= 60;
      updateDisplay(breakTimer, timer.breakSetting);
    }
  });

  breakPlusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');

    timer.breakSetting += 60;
    updateDisplay(breakTimer, timer.breakSetting);
  });

  sessionMinusButton.addEventListener('click', function() {
    if (!timer.timerRunning) {
      var sessionTimer = document.getElementById('session-time'),
          mainCountdownTimer = document.getElementById('main-countdown-timer');

      if (timer.sessionSetting > 0) {
        timer.sessionSetting -= 60;
        updateDisplay(sessionTimer, timer.sessionSetting);
        updateDisplay(mainCountdownTimer, timer.sessionSetting, true);

      }
    }
  });

  sessionPlusButton.addEventListener('click', function() {
    if (!timer.timerRunning) {
      var sessionTimer = document.getElementById('session-time'),
          mainCountdownTimer = document.getElementById('main-countdown-timer');

      timer.sessionSetting += 60;
      updateDisplay(sessionTimer, timer.sessionSetting);
      updateDisplay(mainCountdownTimer, timer.sessionSetting, true);
    }

  });

  startButton.addEventListener('click', function() {
    timer.startTimer();
    timer.timerRunning = true;

  });

  stopButton.addEventListener('click', function() {
    timer.stopTimer();
    timer.timerRunning = false;

  });

  resetButton.addEventListener('click', function() {
    // add code
  });

});

// TODO: finish displayAlert()
function displayAlert(breakOrSession) {
  var alertDiv = document.getElementById('alert-box'),
      alertText = document.getElementById('alert-text'),
      alertButton = document.getElementById('alert-button');

  alertDiv.className += ' show';


  if (breakOrSession === 'break') {

  } else {

  }
}


/*
  Parameters:
     timerObject: the div on the display that shows a time
     seconds: number -  seconds to be converted into mm (optionally mm:ss)
     includeSeconds: bool - if true: display as mm:ss, false (default value): mm
  Returns a string
*/
function updateDisplay(timerObject, seconds, includeSeconds) {


  timerObject.innerHTML = convertSecondsToDisplayTime(seconds, includeSeconds);


}

/*
  Parameters:
     seconds: number -  seconds to be converted into mm (optionally mm:ss)
     includeSeconds: bool - if true: display as mm:ss, false (default value): mm
  Returns a string
*/
function convertSecondsToDisplayTime(seconds, includeSeconds) {
  var newDisplayTime, minutes, seconds;

  minutes = parseInt(seconds / 60).toString();
  newDisplayTime = minutes;

  if (includeSeconds) {
    seconds = (seconds % 60).toString();

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    newDisplayTime += ':' + seconds;
  }

  // returns minutes and seconds in a string
  return newDisplayTime;
}


// break this up into two objects to handle break and session timers, maybe
var timer = {
  // all units of time are in seconds
  sessionSetting: 1500,
  breakSetting: 300,
  currentSeconds: 0,
  currentIntervalID: null,
  // states whether the timer is currently running or not in order to prevent
  // other actions from taking place
  timerRunning: false,
  // takes two parameters
  // timer specifies if it's the break or session timer
  // seconds is the number of seconds
  updateTimer: function(timer, seconds) {
    // countDownDisplay.innerHTML = convertSecondsToDisplayTime(seconds);
  },

  startTimer: function() {
    // main countdown clock
    var mainCountDownDisplay = document.getElementById('main-countdown-timer');

    var timeSetting = this.sessionSetting;

    var timeStamp = new Date().getTime();
    var prevTime = 0;
    var intervalID = setInterval(function() {
      var diff = (new Date().getTime() - timeStamp) / 1000;
      var newTime = parseInt(timeSetting - diff);
      timer.sessionSetting = newTime;
      console.log(timer.sessionSetting);
      // the view is only updated if the number of seconds has change since
      // the last time this method is called
      if (newTime !== prevTime) {
        updateDisplay(mainCountDownDisplay, newTime, true);
      }

    prevTime = newTime;


  }.bind(timer), 250);

    // setTimeout(function() {clearInterval(intervalID)}, 20000);
    this.currentIntervalID = intervalID;
  },

  stopTimer: function() {
    clearInterval(this.currentIntervalID);
  }

};
