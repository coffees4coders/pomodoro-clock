var focusColor = '#dd5Fdd';
var breakColor = '#dddd5f';

document.addEventListener('DOMContentLoaded', function() {

  // Add event listeners for all UI buttons
  var breakMinusButton = document.getElementById('break-minus'),
      breakPlusButton = document.getElementById('break-plus'),
      focusMinusButton = document.getElementById('focus-minus'),
      focusPlusButton = document.getElementById('focus-plus'),
      startButton = document.getElementById('start-button'),
      stopButton = document.getElementById('stop-button'),
      mainCountDownDisplay = document.getElementById('main-timer-display');


  breakMinusButton.addEventListener('click', function() {
    if (breakTimer.timerRunning === false) {

      var breakTimeDial = document.getElementById('break-time-dial');

      if (breakTimer.timeSetting > 60) {
        breakTimer.timeSetting -= 60;

        // rounds down to the nearest minute
        breakTimer.timeSetting = parseInt(breakTimer.timeSetting / 60) * 60;
        updateDisplay(breakTimeDial, breakTimer.timeSetting);

        if (breakTimer.isActive === true) {
          updateDisplay(mainCountDownDisplay, breakTimer.timeSetting, true);
        }

        breakTimer.resetOnStart = true;

      }
    }
  });

  breakPlusButton.addEventListener('click', function() {
    if (breakTimer.timerRunning === false) {
      var breakTimeDial = document.getElementById('break-time-dial');

      // add 60 seconds and round down to the nearest minute
      breakTimer.timeSetting += 60;
      breakTimer.timeSetting = parseInt(breakTimer.timeSetting / 60) * 60;
      updateDisplay(breakTimeDial, breakTimer.timeSetting);

      if (breakTimer.isActive === true) {
        updateDisplay(mainCountDownDisplay, breakTimer.timeSetting, true);
      }


      breakTimer.resetOnStart = true;

    }
  });

  focusMinusButton.addEventListener('click', function() {
    if (focusTimer.timerRunning === false) {
      var focusTimeDial = document.getElementById('focus-time-dial');
      var mainCountDownDisplay = document.getElementById('main-timer-display');

      if (focusTimer.timeSetting > 60) {
        focusTimer.timeSetting -= 60;

        // rounds down to the nearest minute
        focusTimer.timeSetting = parseInt(focusTimer.timeSetting / 60) * 60;
        updateDisplay(focusTimeDial, focusTimer.timeSetting);

        if (focusTimer.isActive === true) {
          updateDisplay(mainCountDownDisplay, focusTimer.timeSetting, true);
        }
        /**
          * ensures that after resetting focus length, timer will
          * restart at new length
          */
        focusTimer.resetOnStart = true;

      }
    }
  });

  focusPlusButton.addEventListener('click', function() {
    if (focusTimer.timerRunning === false) {
      var focusTimeDial = document.getElementById('focus-time-dial');
      var mainCountDownDisplay = document.getElementById('main-timer-display');

      // add 60 seconds and round down to the nearest minute
      focusTimer.timeSetting += 60;
      focusTimer.timeSetting = parseInt(focusTimer.timeSetting / 60) * 60;
      updateDisplay(focusTimeDial, focusTimer.timeSetting);

      if (focusTimer.isActive === true) {
        updateDisplay(mainCountDownDisplay, focusTimer.timeSetting, true);
      }

      // ensures that after resetting focus length,
      // timer will restart at new length
      focusTimer.resetOnStart = true;

    }

  });



  /**
    * this event listener starts and stops the current countdown
    * when the timer is running
    */

  var startStopClock = function() {

    // determine which timer is currently the active timer
    // only the active timer will be started
    var activeTimer = determineActiveTimer();

    if (activeTimer.isFinished === false) {
      if (activeTimer.timerRunning === false) {
        activeTimer.startTimer();
      } else {
        activeTimer.stopTimer();
        activeTimer.timerRunning = false;
      }
    }

  };


  mainCountDownDisplay.addEventListener('click', startStopClock);

  /**
    * Following section initiates various elements of the
    * initial UI
    */

  // inserts time into clock UI when page loads
  updateDisplay(mainCountDownDisplay, determineActiveTimer().timeSetting, true);

  // inserts appropriate title above countdown timer
  document.getElementById('timer-id').innerHTML = determineActiveTimer().id;

  // populate the timer dials
  document.getElementById('focus-time-dial').innerHTML =
    convertSecondsToDisplayTime(focusTimer.timeSetting);
  document.getElementById('break-time-dial').innerHTML =
    convertSecondsToDisplayTime(breakTimer.timeSetting);

    // sets correct color for timer label
    document.getElementById('timer-id').style.color = focusColor;

});

/**
  * find out which timer is the active timer
  * returns the active timer
  */
function determineActiveTimer() {
  var activeTimer;

  // Makes sure that only one timer is currently active
  try {
    if (focusTimer.isActive && breakTimer.isActive) {
      throw "can't have two active timers";
    }

    if (focusTimer.isActive) {
      activeTimer = focusTimer;
    } else {
      activeTimer = breakTimer;
    }

    return activeTimer;
  }

  catch(err) {
    console.log('Error: ' + err);
  }
}

/**
  * this function toggles which timer is the currently active timer
  * returns now active timer
  */
function toggleTimer() {
  var activeTimer = determineActiveTimer();
  var newActiveTimer;
  var timerLabel = document.getElementById('timer-id');
  var activeColor;


  activeTimer.isActive = false;

  if (activeTimer.id === 'focus session') {
    // New Timer is Break
    breakTimer.isActive = true;
    newActiveTimer = breakTimer;
    activeColor = breakColor;
    timerLabel.innerHTML = breakTimer.id;
  } else {
    // New Timer is Focus
    focusTimer.isActive = true;
    newActiveTimer = focusTimer;
    activeColor = focusColor;
    timerLabel.innerHTML = focusTimer.id;
  }

  // inserts appropriate title above countdown timer
  timerLabel.style.color = activeColor;

  return newActiveTimer;
}

/**
  * This function will take a percentage of the countdown remaining
  * and will color the same percent of the clock outline
  *
  * For making circle pie sections:
  *   http://jsfiddle.net/jonathansampson/7PtEm/
  *   http://stackoverflow.com/questions/21205652/how-to-draw-a-circle-sector-in-css
  */
function drawTimerOutline(currentSeconds, totalSeconds) {
  var clock = document.getElementById('outer-circle-clock');
  var activeTimer = determineActiveTimer();

  var activeColor = (activeTimer.id === 'break') ? breakColor : focusColor;
  var percent = (totalSeconds - currentSeconds) / totalSeconds;

  if ( percent < .5) {
    degrees = (percent * 180 / .5) + 90;

    clock.style.backgroundImage = 'linear-gradient(' + degrees +
    'deg, transparent 50%,' + activeColor +
    ' 50%), linear-gradient(90deg,' + activeColor +
    ' 50%, transparent 50%)';

  }

  else if (percent === .5) {
    clock.style.backgroundImage = 'linear-gradient(90deg,' + activeColor +
    ' 50%, transparent 50%)';
    }

  else {
    percent = percent - .5;
    degrees = (percent * 180 / .5) + 90

    clock.style.backgroundImage = 'linear-gradient(' + degrees +
    'deg, transparent 50%, #000 50%), linear-gradient(90deg,' + activeColor +
    ' 50%, transparent 50%)';
  }
}

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
   This function is called whenever a focus or break focus ends
   Takes string as parameter: focus or break, depending on which is ending
*/
function timerFinished() {
  var mainCountDownDisplay = document.getElementById('main-timer-display');
  toggleTimer();
  var activeTimer = determineActiveTimer();

  activeTimer.isFinished = true;
  activeTimer.resetOnStart = true;
  mainCountDownDisplay.style.fontSize = '1.5em';
  mainCountDownDisplay.innerHTML = 'Begin ' + activeTimer.id;

  var clickFunc = function() {
    mainCountDownDisplay.innerHTML = null;
    mainCountDownDisplay.style.fontSize = null;
    mainCountDownDisplay.removeEventListener('click', clickFunc);
    activeTimer.startTimer();
    activeTimer.isFinished = false;
  };
  mainCountDownDisplay.addEventListener('click', clickFunc);

}

/*
  Parameters:
     timerObject: the div on the display that shows a time
     seconds: number -  seconds to be converted into mm (optionally mm:ss)
     includeSeconds: bool - if true: display as mm:ss, false (default value): mm
  Returns a string
*/
function updateDisplay(timerObject, seconds, includeSeconds) {
  var displayTime = convertSecondsToDisplayTime(seconds, includeSeconds);
  var mainTimerDisplay = document.getElementById('main-timer-display');

  timerObject.innerHTML = displayTime;
//  mainTimerDisplay.innerHTML = displayTime;
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


// break this up into two objects to handle break and focus timers, maybe
function Timer(timeSetting) {
  // all units of time are in seconds
  this.timeSetting = timeSetting;
  this.currentSeconds = timeSetting;

  this.currentIntervalID = null;

  // states whether the timer is currently running or not in order to prevent
  // other actions from taking place
  this.timerRunning = false;

  /**
    * determines whether the timer is currently in
    * a completed state
    */
  this.isFinished = false,

  // determines whether the countdown resets at the break or focus length
  // setting when pressing start.
  this.resetOnStart = false;
}
// prototype methods


/**
  * begins timer, arguemnt determines whether the timer begins from the
  * focus or break setting. Takes a string: 'break' or 'focus'
  */
Timer.prototype.startTimer = function() {
  // main countdown clock
  var mainCountDownDisplay = document.getElementById('main-timer-display');
  var self = this;
  self.timerRunning = true;

  if (self.resetOnStart) {
      self.currentSeconds = self.timeSetting;

  }

  var timeSetting = self.currentSeconds;

  var timeStamp = new Date().getTime();
  var prevTime = 0;
  var intervalID = setInterval(function() {
    var diff = (new Date().getTime() - timeStamp) / 1000;
    var newTime = parseInt(timeSetting - diff);

    // the view is only updated if the number of seconds has change since
    // the last time this method is called
    if (newTime !== prevTime) {
      self.currentSeconds--;
      updateDisplay(mainCountDownDisplay, newTime, true);
      drawTimerOutline(newTime, self.timeSetting);
    }

    prevTime = newTime;

    if (self.currentSeconds === 0) {
      self.stopTimer();
      timerFinished();
    }

  }, 250);

  // setTimeout(function() {clearInterval(intervalID)}, 20000);
  self.currentIntervalID = intervalID;
  self.resetOnStart = false;
};

// TODO:
Timer.prototype.stopTimer = function() {
    determineActiveTimer().timerRunning = false;
    clearInterval(this.currentIntervalID);
  };

/**
  * create 2 timer objects
  * isActive property determines which timer
  * is the actively running timer
  */
var focusTimer = new Timer(1500);
focusTimer.id = 'focus session';
focusTimer.isActive = true;

var breakTimer = new Timer(300);
breakTimer.id = 'break';
breakTimer.isActive = false;

// initiates short focus timer for testing purposes
function testTimer() {
  focusTimer = new Timer(10);
  focusTimer.id = 'focus session';
  focusTimer.isActive = true;

  breakTimer = new Timer(10);
  breakTimer.id = 'break';
  breakTimer.isActive = false;
}
