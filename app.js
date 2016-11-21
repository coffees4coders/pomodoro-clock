/**

TODO: change session to focus
TODO: give reset button functionality

NOTE: Break timer object into two timers, Focus and Break

CSS: for making circle sections:
http://jsfiddle.net/jonathansampson/7PtEm/
http://stackoverflow.com/questions/21205652/how-to-draw-a-circle-sector-in-css
*/


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

    if (timer.breakSetting > 60) {
      timer.breakSetting -= 60;

      // rounds down to the nearest minute
      timer.breakSetting = parseInt(timer.breakSetting / 60) * 60;
      updateDisplay(breakTimer, timer.breakSetting);


    }
  });

  breakPlusButton.addEventListener('click', function() {
    var breakTimer = document.getElementById('break-time');

    // add 60 seconds and round down to the nearest minute
    timer.breakSetting += 60;
    timer.breakSetting = parseInt(timer.breakSetting / 60) * 60;
    updateDisplay(breakTimer, timer.breakSetting);

  });

  sessionMinusButton.addEventListener('click', function() {
    if (timer.timerRunning === false) {
      var sessionTimer = document.getElementById('session-time'),
          mainCountdownTimer = document.getElementById('main-countdown-timer');

      if (timer.sessionSetting > 60) {
        timer.sessionSetting -= 60;
        // rounds down to the nearest minute
        timer.sessionSetting = parseInt(timer.sessionSetting / 60) * 60;
        updateDisplay(sessionTimer, timer.sessionSetting);
        updateDisplay(mainCountdownTimer, timer.sessionSetting, true);

        // ensures that after resetting session length,
        // timer will restart at new lenght
        timer.resetOnStart = true;

      }
    }
  });

  sessionPlusButton.addEventListener('click', function() {
    if (timer.timerRunning === false) {
      var sessionTimer = document.getElementById('session-time'),
          mainCountdownTimer = document.getElementById('main-countdown-timer'),
          minutesRoundedDown;

      // add 60 seconds and round down to the nearest minute
      timer.sessionSetting += 60;
      timer.sessionSetting = parseInt(timer.sessionSetting / 60) * 60;
      updateDisplay(sessionTimer, timer.sessionSetting);
      updateDisplay(mainCountdownTimer, timer.sessionSetting, true);

      // ensures that after resetting session length,
      // timer will restart at new lenght
      timer.resetOnStart = true;

    }

  });

  startButton.addEventListener('click', function() {
    if (timer.timerRunning === false) {
      timer.startTimer('focus');
    }

  });

  stopButton.addEventListener('click', function() {
    timer.stopTimer();
    timer.timerRunning = false;

  });

  resetButton.addEventListener('click', function() {
    // add code
  });

});



function addClass(elem, style) {


  elem.className += ' ' + style;

}

function removeClass(elem, style) {
  var elemClassList = elem.className;
  var startIndex = elemClassList.indexOf(' ' + style);
  var revertedClassList = elemClassList.slice(0, startIndex);
  elem.className = revertedClassList;

}

/**
   This function is called whenever a session or break session ends
   Takes string as parameter: session or break, depending on which is ending
*/
function timerFinished(breakOrSession) {
  var alertDiv = document.getElementById('alert-box'),
      alertText = document.getElementById('alert-text'),
      alertButton = document.getElementById('alert-button'),
      alertButtonText = document.getElementById('break-or-session-text');

  timer.resetOnStart = true;

  addClass(alertDiv, 'show');

  if (breakOrSession === 'break') {
    alertButton.addEventListener('click', function() {
      timer.startTimer('focus');
      removeClass(alertDiv, 'show');
    });


    alertButtonText.innerHTML = 'Focus Session';
  } else {
    alertButton.addEventListener('click', function() {
      timer.startTimer('break');
      removeClass(alertDiv, 'show');

    });
    alertButtonText.innerHTML = 'Break';
  }
}

function alertButtonClick() {
  // takes the string from the alert button, which would be 'break' or 'focus'
  // depending on what part of the cycle it is in
  var focusOrBreak = document.getElementById('break-or-session-text').toLowerCase();

  if (focusOrBreak === 'break') {

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

  currentSeconds: 1500,

  currentIntervalID: null,

  // states whether the timer is currently running or not in order to prevent
  // other actions from taking place
  timerRunning: false,

  // determines whether the countdown resets at the break or session length
  // setting when pressing start.
  resetOnStart: false,

  // takes two parameters
  // timer specifies if it's the break or session timer
  // seconds is the number of seconds
  updateTimer: function(timer, seconds) {
    // countDownDisplay.innerHTML = convertSecondsToDisplayTime(seconds);
  },

  // begins timer, arguemnt determines whether the timer begins from the
  // focus or break setting. Takes a string: 'break' or 'focus'
  startTimer: function(focusOrBreak) {
    // main countdown clock
    var mainCountDownDisplay = document.getElementById('main-countdown-timer');

    this.timerRunning = true;


    if (timer.resetOnStart) {
      if (focusOrBreak === 'focus') {
        this.currentSeconds = this.sessionSetting;
    } else {
        this.currentSeconds = this.breakSetting;
      }
    }

    var timeSetting = this.currentSeconds;

    var timeStamp = new Date().getTime();
    var prevTime = 0;
    var intervalID = setInterval(function() {
      var diff = (new Date().getTime() - timeStamp) / 1000;
      var newTime = parseInt(timeSetting - diff);

      // the view is only updated if the number of seconds has change since
      // the last time this method is called
      if (newTime !== prevTime) {
        timer.currentSeconds--;
        updateDisplay(mainCountDownDisplay, newTime, true);
      }

    prevTime = newTime;

    if (timer.currentSeconds === 0) {
      timer.stopTimer();
      timerFinished('session');
    }

  }, 250);

    // setTimeout(function() {clearInterval(intervalID)}, 20000);
    this.currentIntervalID = intervalID;
    this.resetOnStart = false;
  },

  stopTimer: function() {
    clearInterval(this.currentIntervalID);
  }

};
